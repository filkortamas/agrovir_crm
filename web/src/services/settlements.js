import axios from 'axios';
const baseUrl = '/api/settlements';

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
}

const create = async newSettlementObject => {
  const { data } = await axios.post(baseUrl, newSettlementObject);
  return data;
}

export default { getAll, create };