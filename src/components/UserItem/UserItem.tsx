import { FC } from 'react'
import { Avatar, Typography, Chip, IconButton, styled } from '@mui/material'
import { Box } from '@mui/system'
import { DotsIcon } from '../icons/dots'
import { User } from '../../store/features/users/usersSlice'

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

export const UserItem: FC<IUserItemProps> = ({ user, handleDeleteUser }) => (
    <Box key={user.id} sx={{ "&:hover": { background: '#EFEFF6', cursor: 'hover' }}} py={"18px"} px={"30px"} display="flex" alignItems={"center"} justifyContent={"space-between"} gap={"11px"}>
      <Box display="flex" gap={"11px"} alignItems={"center"}>
        <Avatar src={user.image } alt={user.name} sx={{ width: 64, height: 64 }} />
        <Box>
          <Box display="flex" gap={"11px"} alignItems={"center"} mb={0.7}>
            <CustomTypography>{user.name}</CustomTypography>
            <Typography fontWeight={400} fontSize={18} color={"#9494A0"}>{user.email}</Typography>
          </Box>
          <p>{user.permissions.map((permission) => <Chip label={permission} variant="outlined"  sx={{ borderRadius: "10px", fontSize: "16px", mr: "5px", color: "#9494A0" }} />)}</p>
        </Box>
      </Box>
      <IconButton 
        sx={{ alignSelf: 'flex-start' }}
        onClick={() => handleDeleteUser(user.id)}
      >
        <DotsIcon />
        </IconButton>
    </Box>
)