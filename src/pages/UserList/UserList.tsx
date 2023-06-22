import { ChangeEvent, FC, useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../../store/features/users/usersActions';
import { RootState } from '../../store/rootReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Box, Divider, InputAdornment, Modal, styled } from '@mui/material';
import { SearchIcon } from '../../components/icons/search';
import { AddUserForm } from '../AddUserForm';
import { UserItem } from '../../components';
import { ButtonUI } from '../../components/ui/Button';
import { User } from '../../store/features/users/usersSlice';
import { TextFieldUI } from '../../components/ui/TextField';

const CustomBox = styled(Box)(({
  background: '#F9FAFB',
  borderRadius: '15px',
  padding: '15px 0px',
}));

export const UserList: FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);
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

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <CustomBox>
      <Box display="flex" py={"15px"} px={"30px"} justifyContent="space-between">
        <h2>Команда</h2>
        <Box display="flex" alignItems="center" gap="10px">
          <TextFieldUI
            placeholder="Поиск по Email"
            sx={{ width: 650 }}
            onChange={onChangeFilter}
            InputProps={{
              endAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
          />
          <ButtonUI 
            variant="contained" 
            color="secondary"
            onClick={handleOpen}
          >
            Добавить пользователя
          </ButtonUI>
        </Box>
      </Box>
      <Divider />
      {filteredUsers.map(user => (
        <UserItem user={user} handleDeleteUser={handleDeleteUser} />
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <AddUserForm handleClose={handleClose} />
        </Box>
      </Modal>
    </CustomBox>
  );
};