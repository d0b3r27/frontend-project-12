import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { closeModalStart, closeModalFinish } from '../slices/modalSlice'
import AddChannelForm from './addChannelForm'
import EditChannelForm from './editChannelForm'
import RemoveChannelForm from './removeChannelForm'

const ModalWindow = () => {
  const dispatch = useDispatch()
  const { modalType, channelId, isOpen } = useSelector((state) => state.modal)
  const { t } = useTranslation()

  const handleClose = () => {
    dispatch(closeModalStart())
  }

  const handleExited = () => {
    dispatch(closeModalFinish())
  }

  return (
    <Modal show={isOpen} onHide={handleClose} onExited={handleExited} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modal.${modalType}`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalType === 'addChannel' && <AddChannelForm close={handleClose} />}
        {modalType === 'editChannel' && <EditChannelForm id={channelId} close={handleClose} />}
        {modalType === 'removeChannel' && <RemoveChannelForm id={channelId} close={handleClose} />}
      </Modal.Body>
    </Modal>
  )
}

export default ModalWindow
