import { 
  DonutSmallOutlined,
  AccountCircleOutlined,
} from '@mui/icons-material';
import { AnalyticsIcon } from '../icons/analytics';
import { UserIcon } from '../icons/user';
import analytics from '../../assets/icons/analytics.png';
import img2 from '../../assets/icons/Vector.png';
import { ModerateIcon } from '../icons/moderate';
import { ChatIcon } from '../icons/chat';
import { BannerIcon } from '../icons/banner';
import { TeamIcon } from '../icons/team';
import { BlogIcon } from '../icons/blog';
import { CurrencyIcon } from '../icons/currency';
import { ExitIcon } from '../icons/exit';
import { BrowserRoute } from '../../routes/browser.route';
  
  export const sidebarItems = [
    {
      href: BrowserRoute.analytics,
      icon: (<img src={analytics} width={25} height={25} alt=""/>),
      title: 'Аналитика',
    },
    {
      href: BrowserRoute.profile,
      icon: (<UserIcon />),
      title: 'Профиль',
    },
    {
      href: BrowserRoute.moderation,
      icon: (<ModerateIcon fontSize="small" />),
      title: 'Модерация',
    },
    {
      href: BrowserRoute.chats,
      icon: (<ChatIcon fontSize="small" />),
      title: 'Чаты',
    },
    {
      href: BrowserRoute.banner,
      icon: (<BannerIcon fontSize="small" />),
      title: 'Баннеры',
    },
    {
      href: BrowserRoute.team,
      icon: (<TeamIcon fontSize="small" />),
      title: 'Команда',
    },
    {
      href: BrowserRoute.blog,
      icon: (<BlogIcon fontSize="small" />),
      title: 'Блог',
    },
    {
      href: BrowserRoute.currency,
      icon: (<CurrencyIcon />),
      title: 'Курс валют',
    },
    {
        href: '/',
        icon: (<ExitIcon fontSize="small" />),
        title: 'Выйти',
      },
  ];
  