import { FC, ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Box, Button, ListItem, ListItemButton, ListItemIcon, ListItemProps, ListItemText } from '@mui/material';


export interface ISidebarItemProps {
  title: string;
  href: string;
  icon: ReactNode;
  open: boolean;
}

export const SidebarItem: FC<ISidebarItemProps> = (props) => {
  const { href, icon, title, open } = props;

  const { pathname } = useLocation();
  const active = href ? (pathname === href) : false;

  return (
    <NavLink to={href}>
      {({ isActive }) => (
        <ListItem 
          sx={{ display: 'block', padding: 0.6, bgcolor: isActive ? '#EFEFF6' : ''  }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
              minWidth: open ? 'auto' : 100,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      )}
    </NavLink>
  );
};
