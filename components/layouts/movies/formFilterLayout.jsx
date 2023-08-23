import { options } from "./utils";

const Layout = [
  {
    operation: '=',
    type: 'ulong',
    field: 'id',
    name: 'Id'
  },
  {
    operation: '=',
    type: 'string',
    field: 'name',
    name: 'Name'
  },
  {
    operation: '=',
    type: 'uint',
    field: 'duration',
    name: 'Duration',
  },
  {
    operation: '=',
    type: 'int',
    field: 'genre',
    name: 'Genre',
    options: options
  },
]

export default Layout;