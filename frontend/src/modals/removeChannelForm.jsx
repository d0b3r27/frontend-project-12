import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRemoveChannelMutation } from '../slices/apiSlice.js';
import { closeModal } from '../slices/modalSlice.js';
import { setActiveChannelDefault } from '../slices/activeChannelSlice.js';

export const RemoveChannelForm = ({ id }) => {
  const dispatch = useDispatch();
  const [removeChannel] = useRemoveChannelMutation();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const removeHandler = async () => {
    try {
      await removeChannel(id);
      dispatch(setActiveChannelDefault());
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(closeModal());
    }
  };

  return (
    <>
      <p className="lead">Уверены?</p>
      <div className='d-flex justify-content-end'>
        <button type='button' className='me-2 btn btn-secondary' onClick={() => dispatch(closeModal())}>Отменить</button>
        <button type='submit' className='btn btn-danger' onClick={() => removeHandler(id)}>Удалить</button>
      </div>
    </>  
  );
};

export default RemoveChannelForm;