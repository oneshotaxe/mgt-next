import users from './users';
import columns from './columns';
import buses from './buses';
import drivers from './drivers';
import routes from './routes';
import gates from './gates';

export * from './users';
export * from './columns';
export * from './buses';
export * from './drivers';
export * from './routes';
export * from './gates';

const api = {
  users: users,
  columns: columns,
  buses: buses,
  drivers: drivers,
  routes: routes,
  gates: gates,
};

export default api;
