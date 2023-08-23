import { get, toString, isEmpty } from 'lodash';
import React from 'react'

class Store extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: get(props, 'loading', false),
      endpoint: get(props, 'endpoint', null),
      store: JSON.parse(JSON.stringify(get(props, 'layout', []))),
      item: get(props, 'item', {}),
      update: get(props, 'update', false)
    }

    if (this.state.update === true) {
      this.populateStore()
    }
  }

  populateStore() {
    this.state.loading = true

    if (this.state.item === null) {
      return
    }

    const getEndpoint = get(this.state, 'endpoint.get', null)

    if (getEndpoint === null)
      return;

    getEndpoint(this.state.item.id).then((response) => {
      const data = get(response, 'content', null)
      const success = get(response, 'success', false)
      const message = get(response, 'message', 'undefined error')

      if (success !== true) {
        window.snackbar.error(message)
        return
      }

      if (data !== null) {
        for (const key in data) {
          const index = this.state.store.findIndex(x => get(x, 'id') === key)

          if (index !== -1) {
            this.state.store[index] = {
              ...this.state.store[index],
              value: data[key]
            }

            this.setState({ store: this.state.store })
          }
        }
      }

      this.setLoading(false)
    }).catch(() => {
      window.snackbar.error('Undefined error')
      this.setLoading(false)
    })
  }

  onSubmit(e) {
    e.preventDefault()
  }

  isLoading = () => this.state.loading;

  setLoading = (val) => this.setState({ loading: val })

  async submit() {
    if (get(this.state, 'endpoint', null) === null) {
      return null
    }

    const endpoint = this.state.update
      ? get(this.state, 'endpoint.update', null)
      : get(this.state, 'endpoint.create', null)

    if (endpoint === null) {
      return null
    }

    if (this.validate()) {
      let data = {}
      let update = this.state.update;

      this.state.store.forEach(function (item) {
        if (!update && get(item, 'id') !== 'id' || update) {
          data[get(item, 'id')] = get(item, 'value')
        }
      })

      this.setLoading(true)

      return await endpoint(data).then((response) => {
        if (get(response, 'success', false)) {
          window.snackbar.success(get(response, 'message', ''))

          this.state.store.forEach((item) => {
            item.hasChanged = false
          })

          this.setState({ store: this.state.store })
        } else {
          window.snackbar.error(get(response, 'message', ''))
        }

        this.setLoading(false)
        return response;
      }).catch((e) => {
        if (get(e, 'response.status') === 401) {
          window.snackbar.warn('Login expired!')
        } else if (get(e, 'response.status')) {
          window.snackbar.error('Not authorized')
        } else {
          window.snackbar.error(get(e, 'message', ''))
        }
        this.setLoading(false)
        return null
      })
    }

    this.setLoading(false)
    return null
  }

  validate() {
    const item = this.state.store.find(x => isEmpty(toString(get(x, 'value', ''))) && get(x, 'required', false) === true && get(x, 'id') !== 'id');

    if (item) {
      window.snackbar.warn('Field "' + get(item, 'name', '?') + '" is required')
      return false;
    }

    return true
  }

  isValid() {
    const item = this.state.store.find(x => isEmpty(toString(get(x, 'value', ''))) && get(x, 'required', false) === true && get(x, 'id') !== 'id');

    if (item) {
      return false
    }

    const itemChanged = this.state.store.find(x => get(x, 'hasChanged', false) === true);
    if (itemChanged === undefined) {
      return false
    }

    return true
  }

  getField = (id, property) => {
    const index = this.state.store.findIndex(x => x.id === id)

    if (index !== -1) {
      return get(this.state.store[index], property)
    }

    return null
  }

  setField = (id, property, value) => {
    const index = this.state.store.findIndex(x => x.id === id)

    if (index !== -1) {
      let store = this.state.store;

      store[index][property] = value;
      this.setState({ store })
    }
  }

  setValue = (id, value, hasChanged = true) => {
    const obj = { 'id': id, 'value': value }
    const index = this.state.store.findIndex(x => x.id === id)

    if (index !== -1) {
      let store = this.state.store;

      store[index] = {
        ...store[index],
        'value': value,
        'hasChanged': hasChanged,
      };

      this.setState({ store })
    }
    else {
      this.setState({
        store: [
          ...this.state.store,
          obj
        ]
      })
    }
  }
}

export default Store;