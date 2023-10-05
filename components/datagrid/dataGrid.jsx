import { get, isEmpty, isNumber, isFunction, toString, size, omit } from 'lodash';
import { Box, Tooltip, IconButton } from '@mui/material';
import React from 'react'

class DataGrid extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      selecteds: [],
      filters: [],
      values: [],
      order: null,
      totalRegisters: 0,
      page: get(props, 'page', 1),
      params: get(props, 'params', []),
      pageSize: get(props, 'pageSize', 10),
      endpoint: get(props, 'endpoint', null),
      searchFilter: get(props, 'searchFilter', null),
      dynamicFilters: get(props, 'dynamicFilters', []),
      enableSelection: get(props, 'enableSelection', false),
    }

    this.init()
  }

  init = () => {
    this.initVariables();
    this.initStore();
    this.initRowActions();
    this.mountFilters();
  }

  initVariables = () => {
    this.headerActions = get(this.props, 'headerActions', [])
    this.onRowSelectedChanged = get(this.props, 'onRowSelectedChanged', () => { })
    this.searchCounter = 0;
  }

  initStore = () => {
    const layout = get(this.props, 'layout', []);
    const mountedStore = []

    layout.forEach((item) => {
      const obj = {};

      obj['headerName'] = get(item, 'name', '')
      obj['field'] = get(item, 'id', '')
      obj['sortable'] = get(item, 'sortable', false)
      obj['align'] = get(item, 'align', 'left')
      obj['headerAlign'] = get(item, 'headerAlign', 'left')

      const width = get(item, 'width', 0);
      const minWidth = get(item, 'minWidth', 0);

      if (isNumber(width) && width !== 0) {
        obj['width'] = width
      } else if (isNumber(minWidth) && minWidth !== 0) {
        obj['minWidth'] = minWidth
        obj['flex'] = 1
      }
      else {
        obj['flex'] = 1
      }

      const render = get(item, 'render', null);
      if (isFunction(render) && render !== null) {
        obj['renderCell'] = (params) => {
          const row = get(params, 'row')
          return render({
            value: get(row, get(obj, 'field', ''), ''),
            item: row
          })
        }
      }

      mountedStore.push(obj)
    })

    this.state.store = [
      ...mountedStore,
    ]
  }

  initRowActions = () => {
    const actions = get(this.props, 'rowActions', []);

    const mountedRowActions = {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      headerAlign: 'center',
      width: size(actions) * 50 > 70 ? size(actions) * 50 : 70,
      renderCell: (params) => {
        const row = get(params, 'row')
        return <Box sx={{ display: 'flex' }}>
          {
            actions.map(function (item, index) {
              return <Tooltip key={index} title={get(item, 'tooltip', '')}>
                <IconButton onClick={() => { get(item, 'onClick')(row) }}>
                  {
                    React.createElement(get(item, 'icon'))
                  }
                </IconButton>
              </Tooltip >
            })
          }
        </Box>
      }
    }

    if (size(actions) > 0) {
      this.state.store = [
        ...this.state.store,
        mountedRowActions
      ]
    }
  }

  fetch = async () => {
    if (this.state.endpoint === null) {
      return
    }

    let data = {
      pageSize: this.state.pageSize,
      page: this.state.page,
      filters: encodeURIComponent(JSON.stringify(this.state.filters.map((item) => {
        return {
          field: get(item, 'field'),
          operation: get(item, 'operation'),
          //type: get(item, 'type'),
          value: toString(get(item, 'value')),
        }
      })

      )),
      orderBy: this.state.order === null ? '' : JSON.stringify(this.state.order),
    }

    if (!isEmpty(toString(this.state.params))) {
      data = {
        ...data,
        ...this.state.params
      }
    }

    this.setLoading(true)

    return await this.state.endpoint(data).then((response) => {
      if (get(response, 'success', false)) {
        window.snackbar.success(get(response, 'message', ''))

        this.setState({
          values: get(response, 'content.data', []),
          page: get(response, 'content.page', 1),
          pageSize: get(response, 'content.pageSize', 20),
          totalRegisters: get(response, 'content.totalRegisters', 0)
        })
      } else {
        window.snackbar.error(get(response, 'message', ''))
      }

      this.setLoading(false)

      return response;
    }).catch((e) => {
      if (get(e, 'response.status') === 401) {
        window.snackbar.warn('Login expired!')
      } else if (get(e, 'response.status')) {
        window.snackbar.error('Not Authorized')
      } else {
        window.snackbar.error(get(e, 'message', ''))
      }

      this.setLoading(false)

      return null
    })
  }

  mountFilters() {
    let fixedFilters = get(this.props, 'fixedFilters', [])
    let dynamicFilters = get(this.state, 'dynamicFilters', [])

    if (fixedFilters === null) {
      fixedFilters = []
    }

    if (dynamicFilters === null || !(dynamicFilters instanceof Array)) {
      dynamicFilters = []
    } else {
      dynamicFilters = dynamicFilters.filter(function (i) { return !isEmpty(toString(get(i, 'value', ''))) })
    }

    let filters = []

    if (size(fixedFilters) > 0) {
      filters = [
        ...filters,
        ...fixedFilters
      ]
    }

    if (size(dynamicFilters) > 0) {
      filters = [
        ...filters,
        ...dynamicFilters
      ]
    }

    if (this.state.searchFilter !== null) {
      if (!isEmpty(toString(get(this.state.searchFilter, 'value', '')))) {
        filters = [
          ...filters,
          omit(this.state.searchFilter, ['name'])
        ]
      }
    }

    this.state.filters = filters
  }

  onSubmit(e) {
    e.preventDefault()
  }

  isLoading = () => this.state.loading;

  setLoading = (val) => this.setState({ loading: val })
}

export default DataGrid;