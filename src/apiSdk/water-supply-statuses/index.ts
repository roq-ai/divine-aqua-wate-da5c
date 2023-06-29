import axios from 'axios';
import queryString from 'query-string';
import { WaterSupplyStatusInterface, WaterSupplyStatusGetQueryInterface } from 'interfaces/water-supply-status';
import { GetQueryInterface } from '../../interfaces';

export const getWaterSupplyStatuses = async (query?: WaterSupplyStatusGetQueryInterface) => {
  const response = await axios.get(`/api/water-supply-statuses${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createWaterSupplyStatus = async (waterSupplyStatus: WaterSupplyStatusInterface) => {
  const response = await axios.post('/api/water-supply-statuses', waterSupplyStatus);
  return response.data;
};

export const updateWaterSupplyStatusById = async (id: string, waterSupplyStatus: WaterSupplyStatusInterface) => {
  const response = await axios.put(`/api/water-supply-statuses/${id}`, waterSupplyStatus);
  return response.data;
};

export const getWaterSupplyStatusById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/water-supply-statuses/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteWaterSupplyStatusById = async (id: string) => {
  const response = await axios.delete(`/api/water-supply-statuses/${id}`);
  return response.data;
};
