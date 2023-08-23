import { mapOptions } from "./utils";

const Layout = [
  {
    id: 'id',
    name: 'Id',
    width: 150,
    sortable: true,
  },
  {
    id: 'name',
    name: 'Name',
    sortable: true
  },
  {
    id: 'genre',
    name: 'Genre',
    render: ({ value }) => {
      return mapOptions(value)
    },
    sortable: true,
  },
  {
    id: 'duration',
    name: 'Duration (minutes)',
    sortable: true,
  }
];

export default Layout;