import { FC, PropsWithChildren, useState } from 'react';
import { Box, styled } from '@mui/material';
import { Sidebar, drawerWidth } from '../Sidebar';


const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    marginLeft: drawerWidth,
  },
}));

export const Layout: FC<PropsWithChildren> = (props) => {
  const [open, setOpen] = useState(false);


  const handleOpen = (): void => setOpen((prev) => !prev);
  const handleClose = (): void => setOpen(false);


  return (
    <Box maxWidth={'1440px'} margin={'0 auto'} overflow={'hidden'}>
      <Sidebar
        // open={open}
        // onClose={handleClose}
      />

      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
            height: 'calc(100vh - 64px)',
          }}
        >
          {props.children}
        </Box>
      </DashboardLayoutRoot>
    </Box>
  );
};
