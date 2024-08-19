import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/reclamation',
    title: 'Reclamations',
    icon: 'bi bi-chat-left-text',
    class: '',
    extralink: false,
    submenu: []
  },
  
  {
    path: '/component/client',
    title: 'Clients',
    icon: 'bi bi-person-circle fs-5',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/agent',
    title: 'Agents',
    icon: 'bi bi-person fs-5',
    class: '',
    extralink: false,
    submenu: []
  },
  
  {
    path: '/about',
    title: 'About',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  }
];
