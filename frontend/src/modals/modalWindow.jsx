import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { closeModalStart, closeModalFinish } from '../slices/modalSlice';
import { useSelector } from 'react-redux';
import AddChannelForm from './addChannelForm';
import EditChannelForm from './editChannelForm';
import RemoveChannelForm from './removeChannelForm';
import { useTranslation } from 'react-i18next';


const ModalWindow = () => {
  const dispatch = useDispatch();
  const { modalName, modalType, channelId,  isOpen } = useSelector((state) => state.modal);
  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(closeModalStart());
    setTimeout(() => {
      dispatch(closeModalFinish());
    }, 300);
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modal.${modalType}`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalType === 'addChannel' && <AddChannelForm close={handleClose}/>}
        {modalType === 'editChannel' && <EditChannelForm id={channelId} close={handleClose}/>}
        {modalType === 'removeChannel' && <RemoveChannelForm id={channelId} close={handleClose}/>}
      </Modal.Body>
    </Modal>
  );
}

export default ModalWindow;