import { useRef, useEffect } from 'react';
import { Formik, Form } from 'formik';
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

  return (
    <Formik
      initialValues={{}}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await removeChannel(id).unwrap();
          dispatch(setActiveChannelDefault());
          toast.success(t('toasty.channelRemoved'));
          close();
        } catch (e) {
          toast.error(t('toasty.networkError'));
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <p className="lead">{t('modal.uSure')}</p>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="me-2 btn btn-secondary"
              onClick={close}
              ref={inputRef}
            >
              {t('modal.cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              disabled={isSubmitting}
            >
              {t('modal.remove')}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RemoveChannelForm;