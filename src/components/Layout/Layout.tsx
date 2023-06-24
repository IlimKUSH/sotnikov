import { FC, PropsWithChildren } from 'react';
import { Box, styled } from '@mui/material';
import { Sidebar, drawerWidth } from '../Sidebar';


const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  // display: 'flex',
  // flexDirection: 'column',
  // flex: '1 1 auto',
  // maxWidth: '100%',
  // paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    marginLeft: drawerWidth,
    paddingTop: 0,
  },

  // '@media (max-width: 800px)': {
  //   paddingTop: '0',
  // },
}));

export const Layout: FC<PropsWithChildren> = (props) => {
  return (
    <Box maxWidth={'1440px'} margin={'0 auto'} overflow={'hidden'}>
      <Sidebar />

      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
            height: '100vh',
          }}
        >
          {props.children}
        </Box>
      </DashboardLayoutRoot>
    </Box>
  );
};
