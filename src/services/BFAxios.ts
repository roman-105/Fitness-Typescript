import axios from 'axios';

const BFAxios = axios.create({
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
});

export default BFAxios;
