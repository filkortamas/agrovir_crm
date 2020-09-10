import axios from 'axios';
const baseUrl = '/api/partners';

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
}

const create = async newPartnerObject => {
  const { data } = await axios.post(baseUrl, newPartnerObject);
  return data;
}

const remove = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/${id}`);
  return data;
}

const update = async (id, updatedPartnerObject) => {
  const { data } = await axios.put(`${baseUrl}/${id}`, updatedPartnerObject);
  return data;
}

export default { getAll, create, remove, update };