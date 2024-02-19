// assets
import { DashboardOutlined } from '@mui/icons-material';
import { MenuType } from '.';

const icons = {
  dashboard: DashboardOutlined,
};

const dashboard: MenuType = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard1',
      title: 'Dashboard',
      url: '/dashboard',
      type: 'item',
      icon: icons.dashboard,
    }
  ]
};

export default dashboard;