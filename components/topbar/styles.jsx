import theme from "../colors";

const styles = {
  topbar: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    minHeight: '69px',
    display: 'flex',
    justifyContent: 'center',
  },
  generalButtons: {
    textTransform: 'none',
    lineHeight: '1.75',
    fontSize: '1em',
    fontFamily: 'sans-serif',
    fontWeight: '400 !important;',
    borderRadius: 10,
    width: '200px',
    height: '30px',
    color: 'white',
    borderColor: 'white'
  },
  iconButtons: {
    textTransform: 'none',
    lineHeight: '1.75',
    fontSize: '0.8em',
    fontFamily: 'sans-serif',
    fontWeight: '400 !important;',
    borderRadius: 20,
    width: '14vw',
    height: '40px',
    color: 'rgb(25,118,210)',
    borderColor: 'rgb(25,118,210)'
  },
  loginButton: {
    color: 'white'
  },
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerLeft: {
    width: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerRight: {
    width: '180px',
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'center'
  }
};

export default styles;