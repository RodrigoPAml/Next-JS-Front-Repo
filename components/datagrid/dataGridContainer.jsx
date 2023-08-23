import { Box, TablePagination, Card, Grid, TextField, Tooltip, IconButton } from '@mui/material';
import { ptBR } from '@mui/x-data-grid';
import { get, size } from 'lodash';
import StyledDataGrid from './styles';
import DataGrid from './dataGrid';
import AdvancedFilter from './advancedFilter';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RefreshIcon from '@mui/icons-material/Refresh';

class DataGridContainer extends DataGrid {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.setState({ isMounted: true })
    if (get(this.props, 'initialFetch', false) === true) {
      this.fetch()
    }
  }

  render() {
    if (this.state.isMounted !== true) {
      return <Box sx={{ height: '600px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress sx={{ height: '100%', width: '100%', mt: '270px' }} />
      </Box>
    }

    if (this.state.shouldFetch === true) {
      this.fetch()
      this.state.shouldFetch = false
    }

    return (
      <Box sx={{ ...get(this.props, 'sx', undefined), display: 'flex', flexDirection: 'column' }}>
        <Card sx={{ boxShadow: 3 }} >
          <Box sx={{ width: '100%', mt: '10px', mb: '10px' }}>
            <Grid container wrap='nowrap'>
              <Grid item xs={7} sx={{ display: 'flex', alignItems: 'center' }}>
                {
                  this.headerActions.map(function (item, index) {
                    return <Tooltip key={index} title={get(item, 'tooltip', '')}>
                      <IconButton sx={{ ml: '10px' }} onClick={() => { get(item, 'onClick')() }}>
                        {
                          React.createElement(get(item, 'icon'))
                        }
                      </IconButton>
                    </Tooltip >
                  })
                }
              </Grid>
              <Grid item xs={5} sx={{ minWidth: '220px', maxWidth: '400px' }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right', alignItems: 'right', mr: '10px' }}>
                  <TextField
                    fullWidth
                    disabled={this.state.searchFilter == null}
                    sx={{ ml: '10px', mr: '10px', maxWidth: '400px', height: '50px' }}
                    placeholder={
                      this.state.searchFilter != null
                        ? 'Search by field "' + get(this.state.searchFilter, 'name', '-') + '"'
                        : 'Search disabled'
                    }
                    onChange={(e) => {
                      this.state.searchFilter.value = get(e.target, 'value', '')

                      this.mountFilters()

                      this.searchCounter = this.searchCounter + 1
                      let id = this.searchCounter;

                      setTimeout(() => {
                        if (id == this.searchCounter) {
                          this.fetch();
                          this.searchCounter = 0;
                        }
                      }, 500)
                    }} />
                  {
                    this.state.dynamicFilters !== null ?
                      <Tooltip title={'Filters'}>
                        <IconButton disabled={size(this.state.dynamicFilters) == 0} sx={{ m: 0 }} onClick={() => {
                          const dialogId = window.openDialog({
                            title: 'Advanced Filters',
                            sxContent: { minHeight: '100px' },
                            container: AdvancedFilter,
                            containerProps: {
                              filters: this.state.dynamicFilters,
                            },
                            onClose: (reload = false, newFilters) => {
                              if (typeof (reload) === 'boolean') {
                                this.state.filters = newFilters;
                                this.mountFilters()
                              }

                              window.closeDialog(dialogId)

                              if (reload === true) {
                                this.fetch()
                              }
                            }
                          })
                        }}>
                          <FilterAltIcon></FilterAltIcon>
                        </IconButton>
                      </Tooltip >
                      : <></>
                  }
                  <Tooltip title={'Refresh'}>
                    <IconButton sx={{ m: 0 }} onClick={() => { this.fetch() }}>
                      <RefreshIcon></RefreshIcon>
                    </IconButton>
                  </Tooltip >
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ m: 0, minHeight: 400, width: '100%' }}>
            <StyledDataGrid
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              sx={{ minHeight: 400 }}
              autoHeight={true}
              getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
              loading={this.state.loading}
              rows={this.state.values}
              columns={this.state.store}
              pagination
              pageSize={this.state.pageSize}
              rowCount={this.state.totalRegisters}
              paginationMode="server"
              checkboxSelection={this.state.enableSelection}
              selectionModel={this.state.selecteds}
              onSelectionModelChange={(selecteds) => {
                if (size(selecteds) > 0) {
                  const selectionSet = new Set(this.state.selecteds);
                  const result = selecteds.filter((s) => !selectionSet.has(s));

                  this.setState({ selecteds: result })
                  this.onRowSelectedChanged(this.state.values.find(x => get(x, 'id') == result))
                } else {
                  this.setState({ selecteds: [] })
                  this.onRowSelectedChanged(null)
                }
              }}
              onSortModelChange={(model) => {
                if (size(model) == 0) {
                  this.setState({ order: null, shouldFetch: true })
                } else {
                  const field = get(model[0], 'field', '')
                  const ascending = get(model[0], 'sort', 'asc') === 'asc'
                  const order = { field, ascending }
                  this.setState({ order, shouldFetch: true })
                }
              }}
              sortingMode="server"
              disableColumnFilter
              disableSelectionOnClick
              components={{ Pagination: TablePagination }}
              componentsProps={{
                pagination: {
                  component: "div",
                  disabled: size(this.state.values) > 0,
                  count: this.state.totalRegisters,
                  page: this.state.page - 1,
                  rowsPerPage: this.state.pageSize,
                  onPageChange: (_, page) => { this.setState({ page: page + 1, shouldFetch: true, loading: true }) },
                  rowsPerPageOptions: [10, 25, 50, 100],
                  onRowsPerPageChange: (e) => { this.setState({ page: 1, pageSize: e.target.value, shouldFetch: true, loading: true }) },
                  labelRowsPerPage: "Page size",
                  labelDisplayedRows: () => `Page ${this.state.page} of ${Math.max(Math.ceil(parseFloat(this.state.totalRegisters / this.state.pageSize)), 1)}`,
                }
              }}
            />
          </Box>
        </Card>
      </Box>
    );
  }
}

export default DataGridContainer;