import type { TablerIconComponent } from 'vue-tabler-icons'
import {
  AlertCircleIcon,
  BorderAllIcon,
  BoxMultiple1Icon,
  CircleDotIcon,
  LayoutDashboardIcon,
  LoginIcon,
  MoodHappyIcon,
  UserPlusIcon,
} from 'vue-tabler-icons'

export interface Menu {
  header?: string
  title?: string
  icon?: TablerIconComponent
  to?: string
  BgColor?: string
}

export const Menus: Menu[] = [
  { header: 'Sample' },
  {
    title: 'Dashboard',
    icon: LayoutDashboardIcon,
    BgColor: 'primary',
    to: '/',
  },
  {
    title: 'Alert',
    icon: AlertCircleIcon,
    BgColor: 'primary',
    to: '/ui/alerts',
  },
  {
    title: 'Button',
    icon: CircleDotIcon,
    BgColor: 'primary',
    to: '/ui/buttons',
  },
  {
    title: 'Cards',
    icon: BoxMultiple1Icon,
    BgColor: 'primary',
    to: '/ui/cards',
  },
  {
    title: 'Tables',
    icon: BorderAllIcon,
    BgColor: 'primary',
    to: '/ui/tables',
  },
  {
    title: 'Sign In',
    icon: LoginIcon,
    BgColor: 'primary',
    to: '/auth/sign-in',
  },
  {
    title: 'Register',
    icon: UserPlusIcon,
    BgColor: 'primary',
    to: '/auth/register',
  },
  {
    title: 'Icons',
    icon: MoodHappyIcon,
    BgColor: 'primary',
    to: '/icons',
  },
]
