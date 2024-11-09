import '@/styles/globals.css'
import axios from 'axios';

// Set Axios to include credentials with every request
axios.defaults.withCredentials = true;

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
