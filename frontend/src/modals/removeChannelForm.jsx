import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRemoveChannelMutation } from '../slices/apiSlice.js';
import { setActiveChannelDefault } from '../slices/activeChannelSlice.js';
import { useTranslation } from 'react-i18next';

export const RemoveChannelForm = ({ id, close }) => {
  const dispatch = useDispatch();
  const [removeChannel] = useRemoveChannelMutation();
  const inputRef = useRef(null);
  const { t } = useTranslation();

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
      close();
    }
  };

  return (
    <>
      <p className="lead">{t('modal.uSure')}</p>
      <div className='d-flex justify-content-end'>
        <button type='button' className='me-2 btn btn-secondary' onClick={() => close()}>{t('modal.cancel')}</button>
        <button type='submit' className='btn btn-danger' onClick={() => removeHandler(id)}>{t('modal.remove')}</button>
      </div>
    </>  
  );
};

export default RemoveChannelForm;