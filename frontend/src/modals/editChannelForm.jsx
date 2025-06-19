import { useRef, useEffect, useMemo } from 'react'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useGetChannelsQuery, useEditChannelMutation } from '../slices/apiSlice.js'
import { containsProfanity } from '../utils/profanityFilter.js'

const EditChannelForm = ({ id, close }) => {
  const [editChannel] = useEditChannelMutation()
  const { data: channels = [] } = useGetChannelsQuery()
  const inputRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const channelNames = useMemo(
    () => channels.map(channel => channel.name.toLowerCase()),
    [channels],
  )

  const validationSchema = useMemo(() => Yup.object({
    channelName: Yup.string()
      .required(t('yup.required'))
      .min(3, t('yup.min3Max20'))
      .max(20, t('yup.min3Max20'))
      .notOneOf(channelNames, t('yup.alreadyExist'))
      .test(
        'no-profanity',
        t('yup.profanity'),
        value => !containsProfanity(value ?? ''),
      ),
  }), [t, channelNames])

  return (
    <Formik
      initialValues={{ channelName: '' }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        const { channelName } = values
        try {
          await editChannel({ id, channelName }).unwrap()
          toast.success(t('toasty.channelRenamed'))
          close()
        }
        catch {
          toast.error(t('toasty.networkError'))
        }
        finally {
          setSubmitting(false)
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
            <ErrorMessage name="channelName" component="div" className="invalid-feedback" />
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={() => close()}
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
  )
}

export default EditChannelForm
