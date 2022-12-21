import axios from 'axios';

const users = {
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
        rows: PublicUser[];
        total: number;
      }>(`/api/v1/users`, { params })
      .then((res) => res.data);
  },

  _id: {
    get: (id: number) => {
      return axios.get<{ row: PublicUser }>(`/api/v1/users/${id}`).then((res) => res.data.row);
    },

    post: (body: UserDto) => {
      return axios.post<{ id: number }>('/api/v1/users', body).then((res) => res.data.id);
    },

    put: (id: number, body: UserDto) => {
      return axios.put(`/api/v1/users/${id}`, body).then((res) => res.data);
    },

    delete: (id: number) => {
      return axios.delete(`/api/v1/users/${id}`).then((res) => res.data);
    },
  },
};

type PublicUser = {
  id?: number;
  nick: string;
  roles: string[];
};

type UserDto = {
  nick: string;
  password: string | undefined;
  roles: string[];
};

export default users;

export type { PublicUser, UserDto };
