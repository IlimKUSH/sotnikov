import { FC, MouseEvent, useState } from 'react'
import { Avatar, Typography, Chip, IconButton, styled, Menu, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import { DotsIcon } from '../icons/dots'
import { AddUserForm } from '../../pages'
import { ModalUI } from '../ui/Modal/Modal'
import { ToastUI } from '../ui'
import {Album} from "../../store/features/albums/albumsSlice";

enum ModalMessageType {
  ResendCode = 'resend-code',
  UserDeleted = 'user-deleted',
}

interface IPhotoItemProps {
  album: Album;
  handleDeleteAlbum: (albumId: number) => void;
}

const CustomTypography = styled(Typography)(({ theme }) => ({
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '20px',
    color: '#424F5E',
  }));

export const PhotoItem: FC<IPhotoItemProps> = ({ album, handleDeleteAlbum }) => {
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

  const handleDelete = (albumId: number) => {
    handleDeleteAlbum(albumId);
    handleOpen(ModalMessageType.UserDeleted);
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
    <Box key={album.id} sx={styleBox}>
      <Box display="flex" gap={"11px"} alignItems={"center"}>
        <Box mb={0.7}>
          <CustomTypography>{album.username}</CustomTypography>
          <CustomTypography>{album.title}</CustomTypography>
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
        <MenuItem onClick={() => handleDelete(album.id)}>Удалить</MenuItem>
      </Menu>

      <ToastUI
        open={modalMessageType !== null}
        title={'Пользователь успешно удален'}
        onClose={handleClose}
        onOk={() => handleDelete(album.id)}
      />
      <ModalUI
        open={open}
        onClose={handleCloseModal}
      >
        <Box>
          <AddUserForm handleClose={handleCloseModal} editMode data={album} />
        </Box>
      </ModalUI>
    </Box>
  )
}