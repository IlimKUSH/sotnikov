import { ChangeEvent, FC, useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../../store/features/users/usersActions';
import { RootState } from '../../store/rootReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Box, Divider, IconButton, InputAdornment, Modal, Theme, Typography, styled, useMediaQuery } from '@mui/material';
import { SearchIcon } from '../../components/icons/search';
import { AddUserForm } from '../../components/AddUserForm';
import { UserItem } from '../../components';
import { User } from '../../store/features/users/usersSlice';
import { ModalUI } from '../../components/ui/Modal/Modal';
import { ButtonUI, TextFieldUI } from '../../components/ui';
import { BurgerIcon } from '../../components/icons/burger';
import { LoaderUI } from '../../components/ui/Loader';

const CustomBox = styled(Box)(({
  background: '#F9FAFB',
  borderRadius: '15px',
  padding: '15px 0px',
  margin: '0px 40px',

  '@media (max-width: 800px)': {
    margin: '0',
  },
}));

export const UserList: FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state: RootState) => state.users);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(!users.length) {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users])

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  const onChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.email.includes(value)));
    }
  }

  return (
    <CustomBox>
      <Box 
        display="flex" 
        justifyContent="space-between"
        p={"15px 30px"}
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          '@media (max-width: 800px)': {
            px: '10px',
          },
        }}
      >
        <Box display="flex" alignItems="center" gap="5px" pb={1}>
          <IconButton sx={{ display: { sm: 'none' } }}><BurgerIcon /></IconButton> 
          <Typography variant="h4">Команда</Typography>
        </Box>
        <Box 
          flex={0.8} 
          display="flex" 
          alignItems="center" 
          gap="10px"
          sx={{
            width: { md: '100%', lg: '40%'},
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <TextFieldUI
            placeholder="Поиск по Email"
            sx={{ flex: 1, width: { xs: '100%', md: '40%'} }}
            onChange={onChangeFilter}
            InputProps={{
              endAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
          />
          <ButtonUI
            variant="contained" 
            sx={{ width: { xs: '100%', md: '30%'} }}
            color="secondary"
            onClick={handleOpen}
          >
            Добавить пользователя
          </ButtonUI>
        </Box>
      </Box>
      <Divider />
      {loading && <LoaderUI />}

      <Box overflow='hidden' sx={{ height: '100vh', overflowY: 'scroll' }}>
        {filteredUsers.map(user => (
          <UserItem user={user} handleDeleteUser={handleDeleteUser} />
        ))}
      </Box>

      <ModalUI
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box>
          <AddUserForm handleClose={handleClose} />
        </Box>
      </ModalUI>
    </CustomBox>
  );
};