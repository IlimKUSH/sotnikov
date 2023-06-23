import { Box, Modal, Typography } from "@mui/material"
import { FC, ReactNode } from "react";

const style = {
    position: 'absolute',
    width: 400,
    top: '50%',
    left: '50%',
    padding: 30,
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
};

interface IToastUIProps {
    title?: string;
    open: boolean;
    children: ReactNode;
    onClose: () => void;
}

export const ModalUI: FC<IToastUIProps> = ({ title, children, open, onClose }) => {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={onClose}
    >
      <Box sx={style}>
        <Typography textAlign="center"  variant="h6" fontWeight={600} id="modal-title" mb={2}>
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  )
}
