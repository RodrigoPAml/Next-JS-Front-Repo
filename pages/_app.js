import Snackbar from "../components/snackbar"
import { SnackbarProvider } from 'notistack'
import ModalManager from "../components/modal/modalManager";
import { ThemeProvider } from '@mui/material/styles';
import Theme from "../components/colors";
import TopBar from "../components/topbar";
import Footer from "../components/footer";
import { useRouter } from 'next/router';

import "./style.css";

const MyApp = ({ Component, pageProps }) => {
  const { asPath: path } = useRouter();

  const pages = ['/users', '/movies', '/sessions']
  const needToken = pages.findIndex(x => x == path) !== -1

  return <ThemeProvider theme={Theme}>
    <SnackbarProvider>
      <Snackbar></Snackbar>
    </SnackbarProvider>
    <ModalManager></ModalManager>
    <TopBar authorize={needToken}></TopBar>
    <Component {...pageProps} />
    <Footer></Footer>
  </ThemeProvider>
}
export default MyApp