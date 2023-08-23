import { toString, get } from "lodash"

const options = [
  { name: 'User', value: '0' },
  { name: 'Admin', value: '1' },
]

const mapOptions = (value) => {
  const index = options.findIndex((x) => get(x, 'value') == toString(value))

  if (index !== -1) {
    return options[index].name
  } else {
    return '?'
  }
}

export {
  options,
  mapOptions
}