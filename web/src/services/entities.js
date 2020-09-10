import axios from 'axios';
const baseUrl = '/api/entities';

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
}

const create = async newEntityObject => {
  const { data } = await axios.post(baseUrl, newEntityObject);
  return data;
}

export default { getAll, create };