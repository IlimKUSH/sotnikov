import { FC, MouseEvent, useState } from 'react'
import { Avatar, Typography, Chip, IconButton, styled, Menu, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import { DotsIcon } from '../icons/dots'
import { User } from '../../store/features/users/usersSlice'
import { AddUserForm } from '../../pages'
import { ModalUI } from '../ui/Modal/Modal'
import { ToastUI } from '../ui'

enum ModalMessageType {
  ResendCode = 'resend-code',
  UserDeleted = 'user-deleted',
}

interface IUserItemProps {
  user: User;
  handleDeleteUser: (userId: number) => void;
}

const CustomTypography = styled(Typography)(({ theme }) => ({
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '20px',
    color: '#424F5E',
  }));

export const UserItem: FC<IUserItemProps> = ({ user, handleDeleteUser }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalMessageType, setModalMessageType] = useState<ModalMessageType | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    handleCloseMenu();
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpen = (messageType: ModalMessageType) => {
    setModalMessageType(messageType);
  };

  const handleClose = () => {
    setModalMessageType(null);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = (userId: number) => {
    handleDeleteUser(userId);
    handleOpen(ModalMessageType.UserDeleted);
    handleCloseMenu();
  }

  const styleBox = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '11px',
    '&:hover': {
      background: '#EFEFF6',
      cursor: 'hover',
    },
    padding: '18px 30px',
  
    '@media (max-width: 800px)': {
      padding: '18px 10px',
    },
  };

  return (
    <Box key={user.id} sx={styleBox}>
      <Box display="flex" gap={"11px"} alignItems={"center"}>
        <Avatar src={user.image } alt={user.name} sx={{ width: 64, height: 64 }} />
        <Box>
          <Box display="flex" gap={"11px"} alignItems={"center"} mb={0.7}>
            <CustomTypography>{user.name}</CustomTypography>
            <Typography fontWeight={400} fontSize={18} color={"#9494A0"}>{user.email}</Typography>
          </Box>
          <p style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>{user.permissions.map((permission) => {
            const isAdmin = permission === 'Администратор';
            return (
              <Chip label={permission} variant="outlined" color={!!isAdmin ? 'primary' : 'default'}  sx={{ borderRadius: "10px", fontSize: "16px", color: isAdmin ? '' : '#9494A0'  }} />)}
            )
          }
          </p>
        </Box>
      </Box>
      <IconButton 
        sx={{ alignSelf: 'flex-start' }}
        onClick={handleClick}
      >
        <DotsIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {!user.permissions.includes('Администратор') && <MenuItem onClick={handleOpenModal}>Изменить права доступа</MenuItem>}
        <MenuItem onClick={() => handleOpen(ModalMessageType.ResendCode)}>Отправить код повторно</MenuItem>
        <MenuItem onClick={() => handleDelete(user.id)}>Удалить</MenuItem>
      </Menu>

      <ToastUI
        open={modalMessageType !== null}
        title={
          modalMessageType === ModalMessageType.ResendCode
            ? `Приглашение отправлено на почту ${user.email}`
            : 'Пользователь успешно удален'
        }
        onClose={handleClose}
      />
      <ModalUI
        open={open}
        onClose={handleCloseModal}
      >
        <Box>
          <AddUserForm handleClose={handleCloseModal} editMode user={user} />
        </Box>
      </ModalUI>
    </Box>
  )
}