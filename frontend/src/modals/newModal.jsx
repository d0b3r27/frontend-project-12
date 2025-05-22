import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { closeModal } from '../slices/modalSlice';
import { useSelector } from 'react-redux';
import { AddChannelForm } from './addChannel';

const ModalWindow = () => {
  const dispatch = useDispatch();
  const { modalType, isOpen } = useSelector((state) => state.modal);

  const handleClose = () => dispatch(closeModal());

  const textTitle = {
    addChannel: 'Добавить канал',
  }

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{textTitle[modalType]}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddChannelForm/>
      </Modal.Body>
    </Modal>
  );
}

export default ModalWindow;