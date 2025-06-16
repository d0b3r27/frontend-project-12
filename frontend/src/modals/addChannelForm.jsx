import { useRef, useEffect, useMemo } from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAddChannelMutation, useGetChannelsQuery } from '../slices/apiSlice.js';
import { setActiveChannel } from '../slices/activeChannelSlice.js';
import { containsProfanity } from '../utils/profanityFilter.js';

const AddChannelForm = ({ close }) => {
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();
  const { data: channels = [] } = useGetChannelsQuery();
  const inputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const channelNames = useMemo(
    () => channels.map((channel) => channel.name.toLowerCase()),
    [channels],
  );

  const validationSchema = useMemo(() => Yup.object({
    channelName: Yup.string()
      .required(t('yup.required'))
      .min(3, t('yup.min3Max20'))
      .max(20, t('yup.min3Max20'))
      .notOneOf(channelNames, t('yup.alreadyExist'))
      .test(
        'no-profanity',
        t('yup.profanity'),
        (value) => !containsProfanity(value ?? ''),
      ),
  }), [t, channelNames]);

  return (
    <Formik
      initialValues={{ channelName: '' }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        const { channelName } = values;
        try {
          const response = await addChannel({ name: channelName }).unwrap();
          const { name, id } = response;
          dispatch(setActiveChannel({ name, id }));
          toast.success(t('toasty.channelCreated'));
          close();
        } catch (e) {
          toast.error(t('toasty.networkError'));
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <div>
            <Field
              name="channelName"
              autoComplete="off"
              id="channelName"
              placeholder={t('modal.channelName')}
              className={`mb-2 form-control ${touched.channelName && errors.channelName ? 'is-invalid' : ''}`}
              innerRef={inputRef}
            />
            <label className="visually-hidden" htmlFor="channelName">{t('modal.channelName')}</label>
            {errors.channelName && (
              <div className="invalid-feedback d-block">{errors.channelName}</div>
            )}
            {/* <ErrorMessage name="channelName" component="div" className="invalid-feedback" /> */}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={close}
              >
                {t('modal.cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {t('modal.send')}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddChannelForm;
