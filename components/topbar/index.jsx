import { Toolbar, Button, Grid, AppBar, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import styles from './styles';
import { TestToken } from '../../services/Authentication'
import { get } from 'lodash'
import { SetStorage } from '../storage'
import HomeIcon from '@mui/icons-material/Home';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import MovieIcon from '@mui/icons-material/Movie';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const TopBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    (event)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (get(props, 'authorize', false)) {
      TestToken().catch((response) => {
        if (get(response, 'response.status') == 401) {

          SetStorage('TOKEN', null);

          if ((get(props, 'redirect', true))) {
            window.snackbar.warn('Please log in the system, redirecting!', 3000)
            setTimeout(() => {
              window.location.href = '/';
            }, 2500)
          }
        }
      })
    }
  }, []);

  return (
    <>
      <AppBar position="fixed" sx={{ height: '0px' }}>
        <div style={styles.topbar}>
          <div style={styles.containerLeft}>
            <MovieIcon></MovieIcon>
            CineOn
          </div>
          <Grid columnSpacing={2} container style={styles.container}>
            <Grid item>
              <Button
                startIcon={<HomeIcon></HomeIcon>}
                style={styles.generalButtons}
                onClick={() => { window.location.href = '/' }}
                variant='outlined'>
                Main Page
              </Button>
            </Grid>
            <Grid item>
              <Button
                startIcon={<ContactPageIcon></ContactPageIcon>}
                style={styles.generalButtons}
                onClick={() => { window.location.href = 'https://github.com/RodrigoPAml' }}
                variant='outlined'>
                About
              </Button>
            </Grid>
          </Grid>
          <div style={styles.containerRight}>
            <Avatar>
            </Avatar>
            <IconButton sx={{ ml: '5px', backgroundColor: 'white' }} color='primary' onClick={handleClick}>
              <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
            </IconButton>
            <Menu
              id="basic-menu"
              disableScrollLock={true}
              open={open}
              onClose={handleClose}
              anchorEl={anchorEl}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => {
                window.location.href = '/users'
                handleClose()
              }}>Users</MenuItem>
              <MenuItem onClick={() => {
                window.location.href = '/movies'
                handleClose()
              }}>Movies</MenuItem>
              <MenuItem onClick={() => {
                window.location.href = '/sessions'
                handleClose()
              }}>Sessions</MenuItem>
            </Menu>
          </div>
        </div>
      </AppBar>
      <Toolbar sx={{ height: '5px', mb: '5px' }} />
    </>
  )
}

export default TopBar;