import axios from 'axios';
import type { Route } from './routes';
import type { Column } from './columns';

const gates = {
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
        rows: Gate[];
        total: number;
      }>(`/api/v1/gates`, { params })
      .then((res) => res.data);
  },

  _id: {
    get: (id: number) => {
      return axios.get<{ row: Gate }>(`/api/v1/gates/${id}`).then((res) => res.data.row);
    },

    post: (body: Gate) => {
      return axios.post<{ id: number }>('/api/v1/gates', body).then((res) => res.data.id);
    },

    put: (id: number, body: Gate) => {
      return axios.put(`/api/v1/gates/${id}`, body).then((res) => res.data);
    },

    delete: (id: number) => {
      return axios.delete(`/api/v1/gates/${id}`).then((res) => res.data);
    },
  },
};

type Gate = {
  id?: number;
  column?: Column;
  columnId: number | undefined;
  route?: Route;
  routeId: number | undefined;
  num: string;
  durationFirstSmene: string;
  durationSecondSmene: string;
  endWork: string;
  change: string;
  lunchFirstSmene: string;
  lunchSecondSmene: string;
  outPark: string;
};

export default gates;

export type { Gate };
