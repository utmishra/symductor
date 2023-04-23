import React from 'react';
import { Modal, Button, NormalColors } from '@nextui-org/react';

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: NormalColors;
  cancelButtonColor?: NormalColors;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  message,
  onConfirm,
  onClose,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  confirmButtonColor = 'error',
  cancelButtonColor = 'default',
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} color={cancelButtonColor}>
          {cancelButtonText}
        </Button>
        <Button onClick={onConfirm} color={confirmButtonColor}>
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
