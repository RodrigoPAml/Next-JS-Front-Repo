# Next-JS-Base-Repo
Base project for creating NextJs applications with base components
This is just an example
Back-end using C# ASP NET CORE

# Implementations

  - Login
  - Generic Modals
  - Generic DataGrids
  - Generic Filtering and Ordering
  - Generic store and CRUD procedures
  - Works with C# Back-End at https://github.com/RodrigoPAml/ASP-NET-Base-project

# DataGrid Example

```js
 <DataGridContainer
    ref={this.grid}
    sx={{ ml: '20px', mr: '20px', pb: '25px' }}
    layout={DataGridLayout} // Specify Columns names from back-end and more
    dynamicFilters={FilterLayout} // Specify filter allowed 
    endpoint={GetPagedMovies} // Endpoint
    initialFetch={true}
    searchFilter={ // Fast search filter
      {
        operation: 'in',
        type: 'string',
        field: 'name',
        name: 'Name'
      }}
    headerActions={[ // Actions below grid
      {
        tooltip: 'Create',
        icon: AddIcon,
        onClick: () => {
          const dialogId = window.openDialog({
            title: 'Creating new movie',
            container: FormContainer,
            containerProps: { update: false },
            onClose: (reload = false) => {
              window.closeDialog(dialogId)

              if (reload === true) {
                this.grid.current.fetch()
              }
            }
          })
        }
      },
    ]}
    rowActions={[ // Actions of each row
      {
        tooltip: 'Modify',
        icon: EditIcon,
        onClick: (item) => {
          const dialogId = window.openDialog({
            title: 'Modifying movie "' + get(item, 'name') + '"',
            container: FormContainer,
            containerProps: { item, update: true },
            onClose: (reload = false) => {
              window.closeDialog(dialogId)

              if (reload === true) {
                this.grid.current.fetch()
              }
            }
          })
        }
      },
      {
        tooltip: 'Delete',
        icon: DeleteIcon,
        onClick: (item) => {
          const dialogId = window.openDialog({
            title: 'Deleting movie "' + get(item, 'name') + '"',
            container: DeleteContainer,
            containerProps: {
              endpoint: DeleteMovie,
              id: get(item, 'id'),
              title: 'Are you sure you want to delete it? This is  irreversible!'
            },
            onClose: () => {
              window.closeDialog(dialogId)
              this.grid.current.fetch()
            }
          })
        }
      },
    ]}
  >
  </DataGridContainer>
```

## Requisition


![image](https://github.com/RodrigoPAml/Next-JS-Base-Repo/assets/41243039/a973c60b-c3df-4d26-8f88-7be9cf1b6a07)



# Prints

## Login

![image](https://github.com/RodrigoPAml/Next-JS-Base-Repo/assets/41243039/db89230f-5da0-448d-bad9-6846a85e083b)

## DataGrid

![image](https://github.com/RodrigoPAml/Next-JS-Base-Repo/assets/41243039/f6e75f69-7500-4a7f-b23d-f63f4f45f8d1)

Layout example

```js
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
```

## Generic filtering

![image](https://github.com/RodrigoPAml/Next-JS-Base-Repo/assets/41243039/d1d1f85d-f179-41a7-898b-c180896b041f)

Layout example:

```js
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
```

## Crud operations

![image](https://github.com/RodrigoPAml/Next-JS-Base-Repo/assets/41243039/eb236fe0-c73c-4859-ad14-328bde94b6e0)

![image](https://github.com/RodrigoPAml/Next-JS-Base-Repo/assets/41243039/f13f6e58-5619-44c0-a058-348bd2d3fdf5)
