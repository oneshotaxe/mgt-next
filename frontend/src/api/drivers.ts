import axios from 'axios';
import type { Bus } from './buses';
import type { Column } from './columns';

const drivers = {
  get: (
    params: {
      limit: number;
      offset: number;
      search?: string;
      order?: string;
    } = {
      limit: 10,
      offset: 0,
    }
  ) => {
    params.order = params.order || 'created_at desc';
    return axios
      .get<{
        rows: Driver[];
        total: number;
      }>(`/api/v1/drivers`, { params })
      .then((res) => res.data);
  },

  _id: {
    get: (id: number) => {
      return axios.get<{ row: Driver }>(`/api/v1/drivers/${id}`).then((res) => res.data.row);
    },

    post: (body: Driver) => {
      return axios.post<{ id: number }>('/api/v1/drivers', body).then((res) => res.data.id);
    },

    put: (id: number, body: Driver) => {
      return axios.put(`/api/v1/drivers/${id}`, body).then((res) => res.data);
    },

    delete: (id: number) => {
      return axios.delete(`/api/v1/drivers/${id}`).then((res) => res.data);
    },
  },
};

type Driver = {
  id?: number;
  column?: Column;
  columnId: number | undefined;
  bus?: Bus;
  busId: number | undefined;
  graphic: Graphic | undefined;
  num: string;
  fullName: string;
};

type Graphic = {
  date: string;
  format: string;
  name: string;
  items: string[];
};

export default drivers;

export type { Driver, Graphic };
