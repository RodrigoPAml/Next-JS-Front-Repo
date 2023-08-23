import { toString, get } from "lodash"

const options = [
  { name: 'Action', value: 0 },
  { name: 'Adventure', value: 1 },
  { name: 'Comedy', value: 2 },
  { name: 'Drama', value: 3 },
  { name: 'Fantasy', value: 4 },
  { name: 'Horror', value: 5 },
  { name: 'Romance', value: 6 },
  { name: 'SciFi', value: 7 },
  { name: 'Thriller', value: 8 },
  { name: 'Western', value: 9 }
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