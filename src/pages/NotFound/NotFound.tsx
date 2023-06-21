import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';


export const NotFound: FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid xs={6}>
          <Typography variant="h1">
            404
          </Typography>
          <Typography variant="h6" gutterBottom>
            Такой страницы не существует
          </Typography>
          <Button
            component={Link}
            variant="contained"
            to="/"
          >
            Назад
          </Button>
        </Grid>
        <Grid xs={6}>
          <img
            src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
            alt=""
            width={500} height={250}
          />
        </Grid>
      </Grid>
    </Container>
  </Box>
);
