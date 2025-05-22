import { useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useAddChannelMutation } from '../slices/apiSlice';
import { openModal, closeModal } from '../slices/modalSlice.js';

export const AddChannelForm = () => {
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
          innerRef={inputRef}
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