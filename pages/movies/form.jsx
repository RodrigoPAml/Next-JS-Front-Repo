import React from 'react';
import { get, isEmpty, toString } from 'lodash'
import { Card, TextField, Box, Button, FormControl, InputLabel, Select, MenuItem, Stepper, Step, StepButton } from '@mui/material';
import Layout from '../../components/layouts/movies/formLayout'
import { options } from '../../components/layouts/movies/utils'
import { UpdateMovie, CreateMovie, GetMovie } from '../../services/Movie'
import Store from '../../components/store'
import Sessions from '../sessions'

class FormContainer extends Store {
  constructor(props) {
    super({
      ...props,
      endpoint: {
        get: GetMovie,
        create: CreateMovie,
        update: UpdateMovie,
      },
      update: props.update,
      layout: Layout,
    })

    this.state = {
      ...this.state,
      activeStep: 0,
    }
  }

  renderForm() {
    return (<Card sx={{ minHeight: '10px', minWidth: '300px', m: '10px' }}>
      <Box sx={{ display: 'flex', m: '10px', flexDirection: 'column', alignItems: 'left' }}>
        <TextField
          id="name"
          label={this.getField('name', 'name')}
          value={this.getField('name', 'value')}
          disabled={this.isLoading()}
          fullWidth={false}
          required={this.getField('name', 'required')}
          sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
          onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
          margin="normal"
        />
        <TextField
          id="synopsis"
          label={this.getField('synopsis', 'name')}
          value={this.getField('synopsis', 'value')}
          disabled={this.isLoading()}
          fullWidth={false}
          required={this.getField('synopsis', 'required')}
          sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
          onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
          margin="normal"
        />
        <TextField
          id="duration"
          type='number'
          label={this.getField('duration', 'name')}
          value={this.getField('duration', 'value')}
          disabled={this.isLoading()}
          fullWidth={false}
          required={this.getField('duration', 'required')}
          sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
          onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
          margin="normal"
        />
        <FormControl fullWidth
          sx={{ ml: '10px', minWidth: '400px', mt: '10px' }}
        >
          <InputLabel id="select-id">{this.getField('genre', 'name')}</InputLabel>
          <Select
            labelId="select-id"
            id="genre"
            disabled={this.state.loading}
            sx={{ mr: '10px', minWidth: '400px' }}
            value={this.getField('genre', 'value') === undefined ? '' : this.getField('genre', 'value')}
            label={this.getField('genre', 'name')}
            onChange={(e) => {
              this.setValue('genre', e.target.value)
            }}
          >
            {
              options.map((item) => {
                return <MenuItem key={get(item, 'value')} value={get(item, 'value')}>{get(item, 'name')}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </Box>
    </Card>)
  }

  RenderSessions() {
    return (<Sessions
      movieId={this.getField('id', 'value')}
      fixedFilters={[
        {
          operation: "=",
          type: "ulong",
          value: toString(this.getField('id', 'value')),
          field: "movieId"
        }
      ]}
    ></Sessions>)
  }

  render() {
    return (
      <Box sx={{ minHeight: '20vh', mt: 2, minWidth: '70vw' }}>
        <Stepper nonLinear sx={{ mb: '30px' }} activeStep={this.state.activeStep} orientation="horizontal">
          <Step>
            <StepButton disabled={this.state.activeStep !== 0} color="inherit" onClick={() => { this.setState({ activeStep: 0 }) }}>Form</StepButton>
          </Step>
          <Step>
            <StepButton disabled={isEmpty(toString(this.getField('id', 'value')))} color="inherit" onClick={() => { this.setState({ activeStep: 1 }) }}>Sessions</StepButton>
          </Step>
        </Stepper>
        {
          this.state.activeStep === 0 ? this.renderForm() : <></>
        }
        {
          this.state.activeStep === 1 ? this.RenderSessions() : <></>
        }
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
            {this.state.activeStep === 0 ? 'Cancel' : 'OK'}
          </Button>
        </Box>
      </Box>
    )
  }
}

export default FormContainer;