import { Box, Modal, Typography } from "@mui/material"
import { FC, ReactNode, useEffect, useState } from "react";
import { ButtonUI } from "../Button";

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
    title: string;
    open: boolean;
    children?: ReactNode;
    onClose: () => void;
}

export const ToastUI: FC<IToastUIProps> = ({ title, open, onClose }) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
      const timer = setTimeout(() => {
        onClose();
    }, 3000);

    return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [open, onClose]);

  const handleCloseModal = () => {
    setVisible(false);
    onClose();
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={handleCloseModal}

    >
      <Box sx={{ ...style, transition: 'opacity 0.5s', opacity: visible ? 1 : 0 }}>
        <Typography textAlign="center"  variant="h6" fontWeight={600} id="modal-title" mb={2}>
          {title}
        </Typography>
        <ButtonUI variant="contained" color="secondary" fullWidth onClick={onClose}>
          Закрыть
        </ButtonUI>
      </Box>
    </Modal>
  )
}
