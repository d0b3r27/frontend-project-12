import { useRef, useEffect, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEditChannelMutation } from '../slices/apiSlice.js';
import { useGetChannelsQuery } from '../slices/apiSlice.js';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { containsProfanity } from '../utils/profanityFilter.js';

const EditChannelForm = ({ id, close }) => {
  const [editChannel] = useEditChannelMutation();
  const { data: channels = [] } = useGetChannelsQuery();
  const inputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const channelNames = useMemo(() => 
      channels.map((channel) => channel.name.toLowerCase()),
    [channels]);
  
  const validationSchema = Yup.object({
    newName: Yup.string()
      .required(t('yup.required'))
      .min(3, t('yup.min3Max20'))
      .max(20, t('yup.min3Max20'))
      .notOneOf(channelNames, t('yup.alreadyExist'))
      .test(
            'no-profanity',
            t('yup.profanity'),
            (value) => !containsProfanity(value ?? ''),
          ),
    });

  return (
    <Formik
    initialValues={{newName: '',}}
    validationSchema={validationSchema}
    validateOnBlur={false}
    onSubmit={async (values) => {
      const { newName } = values;
      try {
        await editChannel({ newName, id }).unwrap();
        toast.success(t('toasty.channelRenamed'));
        close();
      } catch (e) {
        toast.error(t('toasty.networkError'));
      }
    }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field
              name="newName"
              autoComplete="newName"
              id="newName"
              placeholder={t('modal.channelName')}
              className={`mb-2 form-control ${touched.newName && errors.newName ? 'is-invalid' : ''}`}
              innerRef={inputRef}
            />
            <label className="visually-hidden" htmlFor="newName">{t('modal.addchannelName')}</label>
            <ErrorMessage name="newName" component="div" className="invalid-feedback" />
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

export default EditChannelForm;