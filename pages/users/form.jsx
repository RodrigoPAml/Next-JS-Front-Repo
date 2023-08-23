import React from 'react';
import { get } from 'lodash'
import { Card, TextField, Box, Button } from '@mui/material';
import Layout from '../../components/layouts/users/formLayout'
import { UpdateUser, CreateUser, GetUser } from '../../services/User'
import Store from '../../components/store'

class FormContainer extends Store {
  constructor(props) {
    super({
      ...props,
      endpoint: {
        get: GetUser,
        create: CreateUser,
        update: UpdateUser,
      },
      update: props.update,
      layout: Layout,
    })
  }

  componentDidMount() {
    if (this.state.update) {
      this.setField('password', 'required', false)
      this.setField('login', 'visible', false)
    }
  }

  render() {
    return (
      <Box sx={{ minHeight: '20vh', m: 2, minWidth: '40vw' }}>
        <Card sx={{ minHeight: '10px', minWidth: '400px', m: '10px' }}>
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
            {
              this.getField('login', 'visible') === true
                ? <TextField
                  id="login"
                  label={this.getField('login', 'name')}
                  value={this.getField('login', 'value')}
                  disabled={this.isLoading()}
                  fullWidth={false}
                  required={this.getField('name', 'required')}
                  sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  margin="normal"
                />
                : <></>
            }
            <TextField
              id="password"
              label={this.getField('password', 'name')}
              value={this.getField('password', 'value')}
              disabled={this.isLoading()}
              fullWidth={false}
              required={this.getField('password', 'required')}
              sx={{ ml: '10px', mr: '10px', minWidth: '400px' }}
              onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
              margin="normal"
            />
          </Box>
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