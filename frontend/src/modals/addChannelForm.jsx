import { useRef, useEffect, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { useAddChannelMutation } from '../slices/apiSlice.js';
import { useGetChannelsQuery } from '../slices/apiSlice.js';
import { setActiveChannel } from '../slices/activeChannelSlice.js';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const AddChannelForm = ({close}) => {
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();
  const { data: channels = [] } = useGetChannelsQuery();
  const inputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const channelNames = useMemo(() => 
    channels.map((channel) => channel.name.toLowerCase()),
  [channels]);

  const validationSchema = (t) => Yup.object({
  channelName: Yup.string()
    .required(t('yup.required'))
    .min(3, t('yup.min3Max20'))
    .max(20, t('yup.min3Max20'))
    .notOneOf(channelNames, t('yup.alreadyExist')),
  });

  return (
    <Formik
    initialValues={{channelName: '',}}
    validationSchema={validationSchema(t)}
    validateOnBlur={false}
    onSubmit={async (values) => {
      const { channelName } = values;
      try {
        const response = await addChannel({name: channelName});
        const { name, id } = response.data;
        dispatch(setActiveChannel({name, id}))
      } catch (e) {
        console.log(e);
      } finally {
        close();
      }
    }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field
              name="channelName"
              autoComplete="channelName"
              id="channelName"
              placeholder={t('modal.channelName')}
              className={`mb-2 form-control ${touched.channelName && errors.channelName ? 'is-invalid' : ''}`}
              innerRef={inputRef}
            />
            <label className="visually-hidden" htmlFor="channelName">{t('modal.channelName')}</label>
            <ErrorMessage name="channelName" component="div" className="invalid-feedback"/>
            <div className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={() => close()}>{t('modal.cancel')}</button>
              <button type="submit" className="btn btn-primary">{t('modal.send')}</button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddChannelForm;