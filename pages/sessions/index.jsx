import React from 'react';
import { Box, Card, Avatar, Typography } from "@mui/material"
import { get } from 'lodash'
import FormContainer from './form';
import DeleteContainer from '../../components/deleteContainer';
import DataGridContainer from '../../components/datagrid/dataGridContainer';
import DataGridLayout from '../../components/layouts/sessions/dataGridLayout';
import FilterLayout from '../../components/layouts/sessions/formFilterLayout';
import { GetPagedSessions, DeleteSession } from '../../services/Session'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EventSeatIcon from '@mui/icons-material/EventSeat';

class Sessions extends React.Component {
  constructor(props) {
    super(props)

    this.grid = React.createRef();
  }

  renderHeader() {
    return (
      <>
        <Box sx={{ display: 'flex', height: '70px' }}>
          <Avatar sx={{ width: '60px', height: '60px', ml: '10px', mt: '10px' }}>
            <EventSeatIcon sx={{ width: '37px', height: '37px' }}></EventSeatIcon>
          </Avatar>
          <Typography sx={{ ml: '10px', mt: '10px' }} variant="h4">Sessions</Typography>
        </Box>
        <Box sx={{ display: 'flex', height: '20px', ml: '85px', mt: '-20px', mb: '15px' }}>
          <Typography sx={{ fontSize: 15, color: 'rgb(150, 150, 150)', }}>Admin Area</Typography>
        </Box>
      </>
    )
  }

  render() {
    return (
      <Box sx={{ p: '10px' }}>
        <Card sx={{ m: '20px', mt: 0, boxShadow: 2 }}>
          {
            this.renderHeader()
          }
        </Card >
        <DataGridContainer
          ref={this.grid}
          sx={{ ml: '20px', mr: '20px', pb: '25px' }}
          layout={DataGridLayout}
          fixedFilters={get(this.props, 'fixedFilters', [])}
          dynamicFilters={FilterLayout}
          endpoint={GetPagedSessions}
          initialFetch={true}
          headerActions={[
            {
              tooltip: 'Create',
              icon: AddIcon,
              onClick: () => {
                const dialogId = window.openDialog({
                  title: 'Creating new session',
                  container: FormContainer,
                  containerProps: {
                    update: false,
                    movieId: get(this.props, 'movieId', null)
                  },
                  onClose: (reload = false) => {
                    window.closeDialog(dialogId)

                    if (reload === true) {
                      this.grid.current.fetch()
                    }
                  }
                })
              }
            },
          ]}
          rowActions={[
            {
              tooltip: 'Modify',
              icon: EditIcon,
              onClick: (item) => {
                const dialogId = window.openDialog({
                  title: 'Modifying session "' + get(item, 'id') + '"',
                  container: FormContainer,
                  containerProps: {
                    item,
                    update: true,
                    movieId: get(this.props, 'movieId', null)
                  },
                  onClose: (reload = false) => {
                    window.closeDialog(dialogId)

                    if (reload === true) {
                      this.grid.current.fetch()
                    }
                  }
                })
              }
            },
            {
              tooltip: 'Delete',
              icon: DeleteIcon,
              onClick: (item) => {
                const dialogId = window.openDialog({
                  title: 'Deleting session "' + get(item, 'id') + '"',
                  container: DeleteContainer,
                  containerProps: {
                    endpoint: DeleteSession,
                    id: get(item, 'id'),
                    title: 'Are you sure you want to delete it? This is  irreversible!'
                  },
                  onClose: () => {
                    window.closeDialog(dialogId)
                    this.grid.current.fetch()
                  }
                })
              }
            },
          ]}
        >
        </DataGridContainer>
      </Box>
    );
  }
}

export default Sessions;