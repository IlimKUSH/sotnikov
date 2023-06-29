import { FC, ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Box, Button, ListItem, ListItemButton, ListItemIcon, ListItemProps, ListItemText } from '@mui/material';


export interface IHeaderItemProps {
  title: string;
  href: string;
}

export const HeaderItem: FC<IHeaderItemProps> = (props) => {
  const { href, title } = props;

  return (
    <NavLink to={href}>
      {({ isActive }) => (
        <ListItem
          sx={{ display: 'block', padding: 0.6, bgcolor: isActive ? '#EFEFF6' : ''  }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              px: 2.5,
            }}
          >
            <ListItemText primary={title} />
          </ListItemButton>
        </ListItem>
      )}
    </NavLink>
  );
};
