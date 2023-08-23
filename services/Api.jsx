import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5001',
})

const getConfig = () => {
  return {
    headers: {
      'Authorization': `bearer ${localStorage.getItem('TOKEN')}`,
      'Content-Type': 'application/json'
    }
  };
}

export {
  api,
  getConfig
}