import { FC } from 'react';
import { Button, ButtonProps, styled } from '@mui/material';

const CustomButton = styled(Button)({
    textTransform: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    height: '36px',
  });

export const ButtonUI: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <CustomButton {...props}>{children}</CustomButton>
  )
}
