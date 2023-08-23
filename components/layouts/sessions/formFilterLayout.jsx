import { AutoStories } from '@mui/icons-material';
import { GetPagedMovies } from '../../../services/Movie'
import DataGridLayout from '../movies/dataGridLayout'
import FormFilterLayout from '../movies/formFilterLayout'
import { get } from 'lodash'

const Layout = [
  {
    operation: '=',
    type: 'ulong',
    field: 'id',
    name: 'Id'
  },
  {
    operation: '=',
    type: 'ulong',
    field: 'movieId',
    name: 'Movie',
    fkProps: {
      labelField: (fkRow) => { return get(fkRow, 'name') },
      icon: AutoStories,
      layout: DataGridLayout,
      endpoint: GetPagedMovies,
      dataGridProps: {
        searchFilter: {
          operation: 'in',
          type: 'string',
          field: 'name',
          name: 'Name'
        },
        advancedFilters: FormFilterLayout
      }
    }
  },
]

export default Layout;