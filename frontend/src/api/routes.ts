import axios from 'axios';
import type { Column } from './columns';

const routes = {
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
        rows: Route[];
        total: number;
      }>(`/api/v1/routes`, { params })
      .then((res) => res.data);
  },

  _id: {
    get: (id: number) => {
      return axios.get<{ row: Route }>(`/api/v1/routes/${id}`).then((res) => res.data.row);
    },

    post: (body: Route) => {
      return axios.post<{ id: number }>('/api/v1/routes', body).then((res) => res.data.id);
    },

    put: (id: number, body: Route) => {
      return axios.put(`/api/v1/routes/${id}`, body).then((res) => res.data);
    },

    delete: (id: number) => {
      return axios.delete(`/api/v1/routes/${id}`).then((res) => res.data);
    },
  },
};

type Route = {
  id?: number;
  column?: Column;
  columnId: number | undefined;
  num: string;
};

export default routes;

export type { Route };
