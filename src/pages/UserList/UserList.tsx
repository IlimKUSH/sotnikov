import React, { useEffect } from 'react';
import { fetchUsers, deleteUser } from '../../store/features/users/usersActions';
import { RootState } from '../../store/rootReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Avatar, Box, Button, Chip, Divider, IconButton, InputAdornment, Modal, TextField, Typography, styled } from '@mui/material';
import { SearchIcon } from '../../components/icons/search';
import { DotsIcon } from '../../components/icons/dots';
import { AddUserForm } from '../AddUserForm';
import { UserItem } from '../../components';

const CustomBox = styled(Box)(({ theme }) => ({
  background: '#F9FAFB',
  borderRadius: '15px',
  padding: '15px 0px',
}));

const CustomButton = styled(Button)({
  textTransform: 'none',
  borderRadius: '10px',
});

const CustomTextField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    borderRadius: '10px',
    width: 650,
  },
  '& .MuiOutlinedInput-input': {
    padding: '7px', // Перезапись стиля внутреннего содержимого
  },
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  // fontFamily: 'Futura PT',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '20px',
  color: '#424F5E',
}));

export const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);
  const [open, setOpen] = React.useState(false);

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

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId));
  };

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
          <CustomTextField
            placeholder="Поиск по Email"
            InputProps={{
              endAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
          />
          <CustomButton 
            variant="contained" 
            color="secondary"
            onClick={handleOpen}
          >
            Добавить пользователя
          </CustomButton>
        </Box>
      </Box>
      <Divider />
      {users.map(user => (
        <UserItem user={user} handleDeleteUser={handleDeleteUser} />
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 250 }}>
          <AddUserForm handleClose={handleClose} />
        </Box>
      </Modal>
    </CustomBox>
  );
};