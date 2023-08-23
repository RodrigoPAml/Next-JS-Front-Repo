import { get } from 'lodash'

const Layout = [
  {
    id: 'id',
    name: 'Id',
    width: 150,
    sortable: true,
  },
  {
    id: 'date',
    name: 'Date',
    sortable: true
  },
  {
    id: 'movieId',
    name: 'Movie',
    render: ({item}) => {
      return get(item, 'movie.name')
    },
    sortable: true
  },
];

export default Layout;