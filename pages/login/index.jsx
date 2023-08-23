import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Store from '../../components/store';
import Layout from '../../components/layouts/login'
import { get } from 'lodash'
import { Login } from '../../services/Authentication'
import { GetStorage, SetStorage } from '../../components/storage';
import { Avatar, Button, TextField, Grid, Box, Container, Typography, Card, Link, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

class SignIn extends Store {
  constructor(props) {
    super({
      endpoint: {
        create: Login,
      },
      layout: Layout,
      update: false,
      ...props
    })

    this.state = {
      ...this.state,
      navigate: false,
      showPassword: false,
      mounted: false,
    }
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  changePageWhenTokenPersist = (token, counter = 0) => {
    if (counter === 20) {
      window.snackbar.warn('Fail to complete operation')
      return;
    }

    setTimeout(() => {
      if (GetStorage('TOKEN') === token) {
        this.setState({ navigate: true })
      } else {
        changePageWhenTokenPersist(token, counter + 1)
      }
    }, 100)
  }

  render() {
    if (this.state.navigate) {
      window.location.href = '/movies'
    }

    if (!this.state.mounted) {
      return <Box sx={{ minHeight: '500px', height: '100%', width: '100%', bgcolor: 'rgb(247, 247, 247)' }}>
        <Container component="main" sx={{ justifyItems: 'center', alignItems: 'center' }} onSubmit={this.onSubmit}>
          <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '240px' }}>
            <CircularProgress sx={{ height: '100%', width: '100%' }} />
          </Box>
        </Container>
      </Box>
    }

    return (
      <>
        <Box sx={{ pt: 13, pb: 13, height: '100%', width: '100%', bgcolor: 'rgb(247, 247, 247)' }}>
          <Container sx={{ maxWidth: '600px' }} component="main" maxWidth="sm" onSubmit={this.onSubmit}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '10px' }} >
              <Avatar sx={{ height: '60px', width: '60px', m: 1, bgcolor: 'rgba(0, 0, 0, 0.15)' }} >
                <LockOutlinedIcon color='primary' />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" sx={{ m: 2, pt: 3 }}>
                <Box sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: "center",
                  justifyContent: "center"
                }}>
                </Box>
                <TextField
                  margin="normal"
                  required
                  disabled={this.isLoading()}
                  fullWidth
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  id="login"
                  label="Login"
                  inputProps={{ maxLength: 64 }}
                  autoComplete="login"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  disabled={this.isLoading()}
                  fullWidth
                  type={this.state.showPassword ? 'text' : 'password'}
                  onChange={(e) => { this.setValue(e.target.id, e.target.value) }}
                  label="Password"
                  inputProps={{ maxLength: 32 }}
                  InputProps={{
                    endAdornment: (
                      !this.state.showPassword
                        ? <InputAdornment position='end'>
                          <IconButton onClick={() => { this.setState({ showPassword: true }) }} sx={{ color: 'rgba(1, 1, 1, 0.3)', bgcolor: 'transparent' }}>
                            <VisibilityIcon></VisibilityIcon>
                          </IconButton>
                        </InputAdornment>
                        : <InputAdornment position='end'>
                          <IconButton onClick={() => { this.setState({ showPassword: false }) }} sx={{ color: 'rgba(1, 1, 1, 0.3)', bgcolor: 'transparent' }}>
                            <VisibilityOffIcon></VisibilityOffIcon>
                          </IconButton>
                        </InputAdornment>
                    )
                  }}
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  fullWidth
                  disabled={this.isLoading()}
                  type="button"
                  onClick={() => {
                    this.setLoading(true)
                    this.submit().then((response) => {
                      if (get(response, 'success', false)) {
                        const token = get(response, 'content')
                        SetStorage('TOKEN', token)
                        this.setLoading(true)
                        this.changePageWhenTokenPersist(token)
                      } else {
                        this.setLoading(false)
                      }
                    })
                  }}
                  variant="contained"
                  sx={{ mt: 6, mb: 3 }}
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href='/recovery'>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='/signup'>
                      Signup
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Container>
        </Box>
      </>
    );
  }
}

export default SignIn;