import { TextField, Card, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { get, isEmpty, omit, toString } from 'lodash';
import React from 'react'
import Selector from '../selector';

class AdvancedFilter extends React.Component {
  constructor(props) {
    super()

    this.state = {
      filters: get(props, 'filters', []),
    }

    this.onClose = get(props, 'onClose', () => { })
  }

  getItem = (field) => {
    const index = this.state.filters.findIndex(x => x.field == field)

    if (index !== -1) {
      let filters = this.state.filters;
      return filters[index]
    }
  }

  setValue = (field, value) => {
    const index = this.state.filters.findIndex(x => x.field == field)

    if (index !== -1) {
      let filters = this.state.filters;

      filters[index] = {
        ...filters[index],
        'value': value
      };

      this.setState({ filters })
    }
  }

  setSelectorLabel = (field, label) => {
    const index = this.state.filters.findIndex(x => x.field == field)

    if (index !== -1) {
      let filters = this.state.filters;

      filters[index] = {
        ...filters[index],
        'selectorLabel': label
      };

      this.setState({ filters })
    }
  }

  render() {
    return (
      <Box sx={{ m: '10px' }}>
        <Card sx={{ minWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'left', p: '10px' }}>
          {
            this.state.filters.map((item) => {
              const type = get(item, 'type', '')
              const options = get(item, 'options', null)
              const value = get(item, 'value', '')
              const name = get(item, 'name', '')
              const field = get(item, 'field', '')
              const disabled = get(item, 'disabled', false)
              const props = get(item, `fkProps`, {});

              if (options != null) {
                return <FormControl fullWidth>
                  <InputLabel id="select-id">{name}</InputLabel>
                  <Select
                    labelId="select-id"
                    id={field}
                    value={value}
                    sx={{ ml: '5px', mb: '10px' }}
                    label={name}
                    onChange={(e) => {
                      this.setValue(field, e.target.value)
                    }}
                  >
                    <MenuItem value="">None</MenuItem>
                    {
                      options.map((item) => {
                        return <MenuItem key={get(item, 'value')} value={get(item, 'value')}>{get(item, 'name')}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              }
              else if (type == 'string') {
                return <TextField
                  sx={{ ml: '5px', mb: '10px' }}
                  value={value}
                  id={field}
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  label={name}
                  key={field}
                />
              }
              else if (!isEmpty(props)) {
                if (disabled) {
                  return <></>
                }

                return <Selector
                  id={field}
                  property="id"
                  initialLabel={get(this.getItem(field), 'selectorLabel', '-')}
                  onLabel={(fkRow) => {
                    const fieldFunc = get(props, 'labelField', () => { return '-' })
                    const labelField = !isEmpty(toString(fkRow)) ? fieldFunc(fkRow) : '-'
                    this.setSelectorLabel(field, labelField, '-')
                    return labelField
                  }}
                  icon={get(props, 'icon', '')}
                  label={name}
                  value={value}
                  required={false}
                  dataGridProps={get(props, 'dataGridProps', {})}
                  layout={get(props, 'layout', '')}
                  endpoint={get(props, 'endpoint', '')}
                  disabled={false}
                  onChange={(id, value) => {
                    if (value === null) {
                      this.setSelectorLabel(field, '-')
                    }

                    this.setValue(id, toString(value))
                  }}
                  fullWidth={false}
                  sx={{ ml: '5px', mb: '10px', mt: 0, minWidth: '400px' }}
                  margin="normal"
                />
              }
              else if (type == 'ulong' || type == 'uint' || type == 'int' || type == 'long') {
                return <TextField
                  sx={{ ml: '5px', mb: '10px' }}
                  value={value}
                  id={field}
                  type='number'
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  label={name}
                  key={field}
                />
              }
            })
          }
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '10px' }}>
          <Button
            sx={{ mr: '10px' }}
            onClick={() => {
              const elements = this.state.filters.map((i) => {
                return omit(i, ['name', 'fkProps', 'selectorLabel', 'options', 'disabled'])
              })
              const filtered = elements.filter(function (i) { return !isEmpty(toString(get(i, 'value', ''))) })
              this.onClose(true, filtered)
            }}
            variant='contained'>
            Apply
          </Button>
        </Box>
      </Box>)
  }
}

export default AdvancedFilter;