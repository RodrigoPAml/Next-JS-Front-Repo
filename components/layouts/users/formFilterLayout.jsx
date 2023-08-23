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
    type: 'string',
    field: 'login',
    name: 'Login',
  },
  {
    operation: '=',
    type: 'int',
    options: options,
    field: 'profile',
    name: 'Profile',
  },
]

export default Layout;