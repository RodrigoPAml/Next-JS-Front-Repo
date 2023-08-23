import { mapOptions } from "./utils";

const Layout = [
  {
    id: 'id',
    name: 'Id',
    width: 150,
    sortable: true,
  },
  {
    id: 'login',
    name: 'Login',
    sortable: true
  },
  {
    id: 'name',
    name: 'Name',
    sortable: true
  },
  {
    id: 'profile',
    name: 'Profile',
    sortable: true,
    render: ({ value }) => {
      return mapOptions(value)
    }
  }
];

export default Layout;