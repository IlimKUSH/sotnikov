import { FC } from 'react'
import { TextField, TextFieldProps, styled } from '@mui/material';

const CustomTextField = styled(TextField)(() => ({
    '& .MuiInputBase-root': {
      borderRadius: '10px',
      width: '100%',
    },
    '& .MuiOutlinedInput-input': {
      padding: '7px',
    },
  }));

export const TextFieldUI: FC<TextFieldProps> = ({ children, ...props }) => {
  return (
    <CustomTextField {...props}>{children}</CustomTextField>
  )
}
