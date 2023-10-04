# Next-JS-Base-Repo
Base project for creating NextJs applications with base components

This is just an example to use as a base to create a website using NextJS 

Back-end using C# ASP NET CORE with microservices (restAPI) (https://github.com/RodrigoPAml/ASP-NET-Base-project)

This example was used to create the badge websites (Take a look) in https://github.com/RodrigoPAml/BadgesWebsite

# Base Implementations

  - Login
  - Generic Modals
  - Generic DataGrids
  - Generic Filtering and Ordering
  - Generic store and CRUD procedures
  - Image upload component
  - Works with C# Back-End 

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

![image](https://github.com/RodrigoPAml/Next-JS-Base-Repo/assets/41243039/182d1964-2f0b-46fd-ac30-80a441c09b35)


## DataGrid

![image](https://github.com/RodrigoPAml/Next-JS-Base-Repo/assets/41243039/88d656be-997a-4ecd-8633-698cd3f19e2b)

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

![image](https://github.com/RodrigoPAml/Next-JS-Base-Repo/assets/41243039/4b665d21-6abe-4bb4-9192-80c8403427ea)

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

![image](https://github.com/RodrigoPAml/Next-JS-Base-Repo/assets/41243039/49f3fd4b-aad1-46e4-a295-1972d028513e)

![image](https://github.com/RodrigoPAml/Next-JS-Base-Repo/assets/41243039/4600c69d-7fa9-4ba5-80c7-41ccd0eaec56)

