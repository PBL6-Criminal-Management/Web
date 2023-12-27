import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CrimeIcon from '@heroicons/react/24/solid/ShieldExclamationIcon';
import ScaleIcon from '@heroicons/react/24/solid/ScaleIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import ReportsIcon from '@heroicons/react/24/solid/EnvelopeIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Tổng quan',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Danh sách tài khoản',
    path: '/accounts',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Danh sách tội phạm',
    path: '/criminals',
    icon: (
      <SvgIcon fontSize="small">
        <CrimeIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Danh sách vụ án',
    path: '/cases',
    icon: (
      <SvgIcon fontSize="small">
        <ScaleIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Danh sách báo cáo',
    path: '/reports',
    icon: (
      <SvgIcon fontSize="small">
        <ReportsIcon />
      </SvgIcon>
    )
  },
];
