import axios from 'axios';
import type { Column } from './columns';
import type { Driver } from './drivers';
import type { Gate } from './gates';

const buses = {
  get: (
    params: {
      limit: number;
      offset: number;
      search?: string;
      order?: string;
      columnId?: number;
    } = {
      limit: 10,
      offset: 0,
    }
  ) => {
    params.order = params.order || 'created_at desc';
    return axios
      .get<{
        rows: Bus[];
        total: number;
      }>(`/api/v1/buses`, { params })
      .then((res) => res.data);
  },

  _id: {
    get: (id: number) => {
      return axios.get<{ row: Bus }>(`/api/v1/buses/${id}`).then((res) => res.data.row);
    },

    post: (body: Bus) => {
      return axios.post<{ id: number }>('/api/v1/buses', body).then((res) => res.data.id);
    },

    put: (id: number, body: Bus) => {
      return axios.put(`/api/v1/buses/${id}`, body).then((res) => res.data);
    },

    delete: (id: number) => {
      return axios.delete(`/api/v1/buses/${id}`).then((res) => res.data);
    },
  },
};

type Bus = {
  id?: number;
  column?: Column;
  columnId: number | undefined;
  drivers?: Driver[];
  gate?: Gate;
  gateId: number | undefined;
  num: string;
};

export default buses;

export type { Bus };
