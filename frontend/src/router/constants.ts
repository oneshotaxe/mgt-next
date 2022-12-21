import type { RouteLocationRaw } from 'vue-router';

enum NAMES {
  AUTH = 'auth',
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
  ADMIN_DASHBOARD = 'admin-dashboard',

  ADMIN_USER_LIST = 'users',
  ADMIN_USER_VIEW = 'user',
  ADMIN_USER_CREATOR = 'user-creator',
  ADMIN_USER_EDITOR = 'user-editor',

  EMPLOYEE_COLUMN_LIST = 'employee-columns',
  EMPLOYEE_COLUMN_VIEW = 'employee-column',
  EMPLOYEE_COLUMN_CREATOR = 'employee-column-creator',
  EMPLOYEE_COLUMN_EDITOR = 'employee-column-editor',

  EMPLOYEE_BUS_LIST = 'employee-buses',
  EMPLOYEE_BUS_VIEW = 'employee-bus',
  EMPLOYEE_BUS_CREATOR = 'employee-bus-creator',
  EMPLOYEE_BUS_EDITOR = 'employee-bus-editor',

  EMPLOYEE_DRIVER_LIST = 'employee-drivers',
  EMPLOYEE_DRIVER_VIEW = 'employee-driver',
  EMPLOYEE_DRIVER_CREATOR = 'employee-driver-creator',
  EMPLOYEE_DRIVER_EDITOR = 'employee-driver-editor',

  EMPLOYEE_ROUTE_LIST = 'employee-routes',
  EMPLOYEE_ROUTE_VIEW = 'employee-route',
  EMPLOYEE_ROUTE_CREATOR = 'employee-route-creator',
  EMPLOYEE_ROUTE_EDITOR = 'employee-route-editor',

  EMPLOYEE_GATE_LIST = 'employee-gates',
  EMPLOYEE_GATE_VIEW = 'employee-gate',
  EMPLOYEE_GATE_CREATOR = 'employee-gate-creator',
  EMPLOYEE_GATE_EDITOR = 'employee-gate-editor',
}

const ROUTES = {
  [NAMES.AUTH]: simpleRoute(NAMES.AUTH),
  [NAMES.EMPLOYEE]: simpleRoute(NAMES.EMPLOYEE),
  [NAMES.ADMIN]: simpleRoute(NAMES.ADMIN),
  [NAMES.ADMIN_DASHBOARD]: simpleRoute(NAMES.ADMIN_DASHBOARD),

  [NAMES.ADMIN_USER_LIST]: simpleRoute(NAMES.ADMIN_USER_LIST),
  [NAMES.ADMIN_USER_VIEW]: idRoute(NAMES.ADMIN_USER_VIEW),
  [NAMES.ADMIN_USER_CREATOR]: simpleRoute(NAMES.ADMIN_USER_CREATOR),
  [NAMES.ADMIN_USER_EDITOR]: idRoute(NAMES.ADMIN_USER_EDITOR),

  [NAMES.EMPLOYEE_COLUMN_LIST]: simpleRoute(NAMES.EMPLOYEE_COLUMN_LIST),
  [NAMES.EMPLOYEE_COLUMN_VIEW]: idRoute(NAMES.EMPLOYEE_COLUMN_VIEW),
  [NAMES.EMPLOYEE_COLUMN_CREATOR]: simpleRoute(NAMES.EMPLOYEE_COLUMN_CREATOR),
  [NAMES.EMPLOYEE_COLUMN_EDITOR]: idRoute(NAMES.EMPLOYEE_COLUMN_EDITOR),

  [NAMES.EMPLOYEE_BUS_LIST]: idRoute(NAMES.EMPLOYEE_BUS_LIST, 'columnId'),
  [NAMES.EMPLOYEE_BUS_VIEW]: doubleIdRoute(NAMES.EMPLOYEE_BUS_VIEW),
  [NAMES.EMPLOYEE_BUS_CREATOR]: idRoute(NAMES.EMPLOYEE_BUS_CREATOR, 'columnId'),
  [NAMES.EMPLOYEE_BUS_EDITOR]: doubleIdRoute(NAMES.EMPLOYEE_BUS_EDITOR),

  [NAMES.EMPLOYEE_DRIVER_LIST]: idRoute(NAMES.EMPLOYEE_DRIVER_LIST, 'columnId'),
  [NAMES.EMPLOYEE_DRIVER_VIEW]: doubleIdRoute(NAMES.EMPLOYEE_DRIVER_VIEW),
  [NAMES.EMPLOYEE_DRIVER_CREATOR]: idRoute(NAMES.EMPLOYEE_DRIVER_CREATOR, 'columnId'),
  [NAMES.EMPLOYEE_DRIVER_EDITOR]: doubleIdRoute(NAMES.EMPLOYEE_DRIVER_EDITOR),

  [NAMES.EMPLOYEE_ROUTE_LIST]: idRoute(NAMES.EMPLOYEE_ROUTE_LIST, 'columnId'),
  [NAMES.EMPLOYEE_ROUTE_VIEW]: doubleIdRoute(NAMES.EMPLOYEE_ROUTE_VIEW),
  [NAMES.EMPLOYEE_ROUTE_CREATOR]: idRoute(NAMES.EMPLOYEE_ROUTE_CREATOR, 'columnId'),
  [NAMES.EMPLOYEE_ROUTE_EDITOR]: doubleIdRoute(NAMES.EMPLOYEE_ROUTE_EDITOR),

  [NAMES.EMPLOYEE_GATE_LIST]: idRoute(NAMES.EMPLOYEE_GATE_LIST, 'columnId'),
  [NAMES.EMPLOYEE_GATE_VIEW]: doubleIdRoute(NAMES.EMPLOYEE_GATE_VIEW),
  [NAMES.EMPLOYEE_GATE_CREATOR]: idRoute(NAMES.EMPLOYEE_GATE_CREATOR, 'columnId'),
  [NAMES.EMPLOYEE_GATE_EDITOR]: doubleIdRoute(NAMES.EMPLOYEE_GATE_EDITOR),
};

function simpleRoute(name: string): RouteLocationRaw {
  return { name };
}

function idRoute(name: string, idParamName = 'id'): (id: number) => RouteLocationRaw {
  return (id: number) => ({ name, params: { [idParamName]: id } });
}

function doubleIdRoute(
  name: string,
  idParamName = 'columnId',
  secondIdParamName = 'id'
): (id: number, secondId: number) => RouteLocationRaw {
  return (id: number, secondId: number) => ({
    name,
    params: { [idParamName]: id, [secondIdParamName]: secondId },
  });
}

export { NAMES, ROUTES };
