import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useAddChannelMutation } from '../slices/apiSlice';
import { openModal, closeModal } from '../slices/modalSlice.js';

const AddChannelForm = () => {
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();
  return (
    <Formik
    initialValues={{channelName: '',}}
    onSubmit={(values) => {
      const { channelName } = values;
      addChannel({name: channelName});
    }}
  >
    <Form>
      <div>
        <Field
          name='channelName'
          autoComplete='channelName'
          id='channelName'
          placeholder='Имя канала'
          className='mb-2 form-control'
        />
        <label className='visually-hidden' htmlFor='channelName'>Имя канала</label>
        <div className='invalid-feedback'></div>
        <div className='d-flex justify-content-end'>
          <button type='button' className='me-2 btn btn-secondary' onClick={() => dispatch(closeModal())}>Отменить</button>
          <button type='submit' className='btn btn-primary'>Отправить</button>
        </div>
      </div>
    </Form>
  </Formik>
  );
} ;

const AddChannelModal = () => {
  const dispatch = useDispatch();
  return (
    <div className='modal-dialog modal-dialog-centered'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='modal-title h4'>Добавить канал</div>
          <button type='button' aria-label='Close' data-bs-dismiss='modal' className='btn btn-close' onClick={() => dispatch(closeModal())}></button>
        </div>
        <div className='modal-body'>
          <AddChannelForm />
        </div>
      </div>
    </div>
  );
};

export default AddChannelModal;