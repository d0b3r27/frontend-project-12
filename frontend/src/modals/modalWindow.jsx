import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { closeModal } from '../slices/modalSlice';
import { useSelector } from 'react-redux';
import AddChannelForm from './addChannelForm';
import EditChannelForm from './editChannelForm';
import RemoveChannelForm from './removeChannelForm';


const ModalWindow = () => {
  const dispatch = useDispatch();
  const { modalName, modalType, channelId,  isOpen } = useSelector((state) => state.modal);

  const handleClose = () => dispatch(closeModal());

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalType === 'addChannel' && <AddChannelForm/>}
        {modalType === 'editChannel' && <EditChannelForm id={channelId}/>}
        {modalType === 'removeChannel' && <RemoveChannelForm id={channelId}/>}
      </Modal.Body>
    </Modal>
  );
}

export default ModalWindow;