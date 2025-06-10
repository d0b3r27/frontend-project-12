import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRemoveChannelMutation } from '../slices/apiSlice.js';
import { setActiveChannelDefault } from '../slices/activeChannelSlice.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

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
      await removeChannel(id).unwrap();
      dispatch(setActiveChannelDefault());
      toast.success(t('toasty.channelRemoved'));
      close();
    } catch (e) {
      toast.error(t('toasty.networkError'));
    } 
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      removeHandler();
    }}>
      <p className="lead">{t('modal.uSure')}</p>
      <div className='d-flex justify-content-end'>
        <button type='button' className='me-2 btn btn-secondary' onClick={close}>
          {t('modal.cancel')}
        </button>
        <button type='submit' className='btn btn-danger'>
          {t('modal.remove')}
        </button>
      </div>
    </form>
  );
};

export default RemoveChannelForm;