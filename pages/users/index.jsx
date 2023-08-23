import React from 'react';
import { Box, Card, Avatar, Typography } from "@mui/material"
import { get } from 'lodash'
import FormContainer from './form';
import DeleteContainer from '../../components/deleteContainer';
import DataGridContainer from '../../components/datagrid/dataGridContainer';
import DataGridLayout from '../../components/layouts/users/dataGridLayout';
import FilterLayout from '../../components/layouts/users/formFilterLayout';
import { GetPagedUsers, DeleteUser } from '../../services/User'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

class Users extends React.Component {
  constructor(props) {
    super(props)

    this.grid = React.createRef();
  }

  renderHeader() {
    return (
      <>
        <Box sx={{ display: 'flex', height: '70px' }}>
          <Avatar sx={{ width: '60px', height: '60px', ml: '10px', mt: '10px' }}>
            <AccountCircleIcon sx={{ width: '37px', height: '37px' }}></AccountCircleIcon>
          </Avatar>
          <Typography sx={{ ml: '10px', mt: '10px' }} variant="h4">Users</Typography>
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
          dynamicFilters={FilterLayout}
          endpoint={GetPagedUsers}
          initialFetch={true}
          searchFilter={
            {
              operation: 'in',
              type: 'string',
              field: 'name',
              name: 'Name'
            }}
          headerActions={[
            {
              tooltip: 'Create',
              icon: AddIcon,
              onClick: () => {
                const dialogId = window.openDialog({
                  title: 'Creating new user',
                  container: FormContainer,
                  containerProps: { update: false },
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
                  title: 'Modifying user "' + get(item, 'login') + '"',
                  container: FormContainer,
                  containerProps: { item, update: true },
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
                  title: 'Deleting user "' + get(item, 'login') + '"',
                  container: DeleteContainer,
                  containerProps: {
                    endpoint: DeleteUser,
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

export default Users;