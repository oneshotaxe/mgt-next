import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '@/views/AuthView.vue';
import { beforeEach, forAuthorized } from './guards';
import { NAMES, ROUTES } from './constants';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: NAMES.AUTH,
      component: AuthView,
    },
    {
      path: '/employee',
      name: NAMES.EMPLOYEE,
      redirect: ROUTES[NAMES.EMPLOYEE_COLUMN_LIST],
      component: () => import('@/views/employee/EmployeeView.vue'),
      beforeEnter: forAuthorized,
      children: [
        // Колонны
        {
          path: 'columns',
          name: NAMES.EMPLOYEE_COLUMN_LIST,
          component: () => import('@/views/employee/columns/ColumnsView.vue'),
        },
        {
          path: 'columns/:id',
          name: NAMES.EMPLOYEE_COLUMN_VIEW,
          component: () => import('@/views/employee/columns/ColumnView.vue'),
        },
        {
          path: 'columns/:id/edit',
          name: NAMES.EMPLOYEE_COLUMN_EDITOR,
          component: () => import('@/views/employee/columns/ColumnEditor.vue'),
        },
        // Автобусы
        {
          path: 'columns/:columnId/buses',
          name: NAMES.EMPLOYEE_BUS_LIST,
          component: () => import('@/views/employee/buses/BusesView.vue'),
        },
        {
          path: 'columns/:columnId/buses/create',
          name: NAMES.EMPLOYEE_BUS_CREATOR,
          component: () => import('@/views/employee/buses/BusEditor.vue'),
        },
        {
          path: 'columns/:columnId/buses/:id',
          name: NAMES.EMPLOYEE_BUS_VIEW,
          component: () => import('@/views/employee/buses/BusView.vue'),
        },
        {
          path: 'columns/:columnId/buses/:id/edit',
          name: NAMES.EMPLOYEE_BUS_EDITOR,
          component: () => import('@/views/employee/buses/BusEditor.vue'),
        },
        // Водители
        {
          path: 'columns/:columnId/drivers',
          name: NAMES.EMPLOYEE_DRIVER_LIST,
          component: () => import('@/views/employee/drivers/DriversView.vue'),
        },
        {
          path: 'columns/:columnId/drivers/create',
          name: NAMES.EMPLOYEE_DRIVER_CREATOR,
          component: () => import('@/views/employee/drivers/DriverEditor.vue'),
        },
        {
          path: 'columns/:columnId/drivers/:id',
          name: NAMES.EMPLOYEE_DRIVER_VIEW,
          component: () => import('@/views/employee/drivers/DriverView.vue'),
        },
        {
          path: 'columns/:columnId/drivers/:id/edit',
          name: NAMES.EMPLOYEE_DRIVER_EDITOR,
          component: () => import('@/views/employee/drivers/DriverEditor.vue'),
        },
        // Маршруты
        {
          path: 'columns/:columnId/routes',
          name: NAMES.EMPLOYEE_ROUTE_LIST,
          component: () => import('@/views/employee/routes/RoutesView.vue'),
        },
        {
          path: 'columns/:columnId/routes/create',
          name: NAMES.EMPLOYEE_ROUTE_CREATOR,
          component: () => import('@/views/employee/routes/RouteEditor.vue'),
        },
        {
          path: 'columns/:columnId/routes/:id',
          name: NAMES.EMPLOYEE_ROUTE_VIEW,
          component: () => import('@/views/employee/routes/RouteView.vue'),
        },
        {
          path: 'columns/:columnId/routes/:id/edit',
          name: NAMES.EMPLOYEE_ROUTE_EDITOR,
          component: () => import('@/views/employee/routes/RouteEditor.vue'),
        },
        // Выходы
        {
          path: 'columns/:columnId/gates',
          name: NAMES.EMPLOYEE_GATE_LIST,
          component: () => import('@/views/employee/gates/GatesView.vue'),
        },
        {
          path: 'columns/:columnId/gates/create',
          name: NAMES.EMPLOYEE_GATE_CREATOR,
          component: () => import('@/views/employee/gates/GateEditor.vue'),
        },
        {
          path: 'columns/:columnId/gates/:id',
          name: NAMES.EMPLOYEE_GATE_VIEW,
          component: () => import('@/views/employee/gates/GateView.vue'),
        },
        {
          path: 'columns/:columnId/gates/:id/edit',
          name: NAMES.EMPLOYEE_GATE_EDITOR,
          component: () => import('@/views/employee/gates/GateEditor.vue'),
        },
      ],
    },
    {
      path: '/admin',
      name: NAMES.ADMIN,
      redirect: ROUTES[NAMES.ADMIN_DASHBOARD],
      component: () => import('@/views/admin/AdminView.vue'),
      beforeEnter: forAuthorized,
      children: [
        {
          path: 'dashboard',
          name: NAMES.ADMIN_DASHBOARD,
          component: () => import('@/views/admin/dashboard/DashboardView.vue'),
        },
        // Пользователи
        {
          path: 'users',
          name: NAMES.ADMIN_USER_LIST,
          component: () => import('@/views/admin/users/UsersView.vue'),
        },
        {
          path: 'users/create',
          name: NAMES.ADMIN_USER_CREATOR,
          component: () => import('@/views/admin/users/UserEditor.vue'),
        },
        {
          path: 'users/:id',
          name: NAMES.ADMIN_USER_VIEW,
          component: () => import('@/views/admin/users/UserView.vue'),
        },
        {
          path: 'users/:id/edit',
          name: NAMES.ADMIN_USER_EDITOR,
          component: () => import('@/views/admin/users/UserEditor.vue'),
        },
        // Колонны
        {
          path: 'columns',
          name: NAMES.ADMIN_COLUMN_LIST,
          component: () => import('@/views/admin/columns/ColumnsView.vue'),
        },
        {
          path: 'columns/create',
          name: NAMES.ADMIN_COLUMN_CREATOR,
          component: () => import('@/views/admin/columns/ColumnEditor.vue'),
        },
        {
          path: 'columns/:id',
          name: NAMES.ADMIN_COLUMN_VIEW,
          component: () => import('@/views/admin/columns/ColumnView.vue'),
        },
        {
          path: 'columns/:id/edit',
          name: NAMES.ADMIN_COLUMN_EDITOR,
          component: () => import('@/views/admin/columns/ColumnEditor.vue'),
        },
      ],
    },
  ],
});

router.beforeEach(beforeEach);

export default router;

export { NAMES, ROUTES };
