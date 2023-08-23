import React from 'react';
import { get } from 'lodash'
import { Card, TextField, Box, Button } from '@mui/material';
import Layout from '../../components/layouts/sessions/formLayout'
import { UpdateSession, CreateSession, GetSession } from '../../services/Session'
import Store from '../../components/store'
import { GetPagedMovies } from '../../services/Movie'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DataGridLayout from '../../components/layouts/movies/dataGridLayout'
import FilterLayout from '../../components/layouts/movies/formFilterLayout';
import Selector from '../../components/selector';
import { AutoStories } from '@mui/icons-material';

class FormContainer extends Store {
  constructor(props) {
    super({
      ...props,
      endpoint: {
        get: GetSession,
        create: CreateSession,
        update: UpdateSession,
      },
      update: props.update,
      layout: Layout,
    })
  }

  componentDidMount() {
    this.setValue('date', new Date().toJSON())

    if (this.props.movieId !== null) {
      this.setValue('movieId', this.props.movieId)
    }
  }

  render() {
    return (
      <Box sx={{ minHeight: '20vh', m: 2, minWidth: '30vw' }}>
        <Card sx={{ minHeight: '10px', minWidth: '300px', m: '10px' }}>
          <Box sx={{ display: 'flex', m: '10px', flexDirection: 'column', alignItems: 'left' }}>
            <LocalizationProvider dateAdapter={AdapterMoment} >
              <DesktopDatePicker
                label={this.getField('date', 'name')}
                inputFormat="DD/MM/YYYY"
                required
                value={this.getField('date', 'value')}
                disabled={this.isLoading()}
                onChange={(newValue) => {
                  this.setValue("date", get(newValue, '_d', null).toJSON())
                }}
                renderInput={(params) => <TextField onKeyDown={(e) => { e.preventDefault(); }} sx={{ ml: '10px', mr: '10px', minWidth: '300px', maxWidth: '400px' }} {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Selector
            id="movieId"
            property="id"
            visible={this.props.movieId === null}
            initialLabel={get(this.state, 'item.movie.name', '')}
            onLabel={(fkRow) => { return (get(fkRow, 'name', '')) }}
            icon={AutoStories}
            label={this.getField('movieId', 'name')}
            value={this.getField('movieId', 'value')}
            required
            layout={DataGridLayout}
            endpoint={GetPagedMovies}
            disabled={this.isLoading()}
            onChange={(id, value) => { this.setValue(id, value) }}
            fullWidth={false}
            sx={{ ml: '20px', mr: '10px', minWidth: '400px' }}
            margin="normal"
            dataGridProps={{
              searchFilter: {
                operation: 'in',
                type: 'string',
                field: 'name',
                name: 'Name'
              },
              dynamicFilters: FilterLayout
            }}
          />
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: '10px' }}>
          <Button
            disabled={!this.isValid() || this.isLoading()}
            onClick={() => {
              this.submit().then((response) => {
                if (get(response, 'success', false)) {
                  this.props.onClose(true)
                }
              });
            }}
            variant='contained'>
            {this.state.update ? 'Update' : 'Create'}
          </Button>
          <Button
            onClick={() => { this.props.onClose(true) }}
            sx={{ ml: '2px' }}
            variant='outlined'>
            Cancel
          </Button>
        </Box>
      </Box>
    )
  }
}

export default FormContainer;