import axios from 'axios';
import type { PublicUser } from './users';

const columns = {
  get: (
    params: {
      limit: number;
      offset: number;
      search?: string;
      order?: string;
      userId?: number;
    } = {
      limit: 10,
      offset: 0,
    }
  ) => {
    params.order = params.order || 'created_at desc';
    return axios
      .get<{
        rows: Column[];
        total: number;
      }>(`/api/v1/columns`, { params })
      .then((res) => res.data);
  },

  _id: {
    get: (id: number) => {
      return axios.get<{ row: Column }>(`/api/v1/columns/${id}`).then((res) => res.data.row);
    },

    post: (body: Column) => {
      return axios.post<{ id: number }>('/api/v1/columns', body).then((res) => res.data.id);
    },

    put: (id: number, body: Column) => {
      return axios.put(`/api/v1/columns/${id}`, body).then((res) => res.data);
    },

    delete: (id: number) => {
      return axios.delete(`/api/v1/columns/${id}`).then((res) => res.data);
    },

    journal: (id: number, month: string) => {
      return axios
        .get<{ row: Column }>(`/api/v1/columns/${id}/journal`, { params: { month } })
        .then((res) => res.data);
    },

    agreement: (id: number) => {
      return axios.get<{ row: Column }>(`/api/v1/columns/${id}/agreement`).then((res) => res.data);
    },

    upload: (id: number, body: unknown) => {
      return axios
        .post<{ row: Column }>(`/api/v1/columns/${id}/upload`, body)
        .then((res) => res.data);
    },
  },
};

type Column = {
  id?: number;
  user?: PublicUser;
  userId: number | undefined;
  title: string;
};

export default columns;

export type { Column };
