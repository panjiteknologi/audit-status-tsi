// assets
import { WalletOutlined, } from '@mui/icons-material';
import { MenuType } from '.';

const icons = {
  payslip: WalletOutlined,
};

const dashboard: MenuType = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'payslip',
      title: 'Payslip',
      url: '/payslip',
      type: 'item',
      icon: icons.payslip,
    }
  ]
};

export default dashboard;