import {BASE_URL} from '@/constants/env';
import {get, post, put} from '@/utils/callApi';

export const getEventsListApi = async () => {
  const url = `${BASE_URL}events/`;
  return await get(url);
};

export const createEventApi = async (payload: object) => {
  const url = `${BASE_URL}events/`;
  return await post(url, payload);
};

export const updateEventApi = async (id: string, payload: object) => {
  const url = `${BASE_URL}events/${id}`;
  return await put(url, payload);
};
