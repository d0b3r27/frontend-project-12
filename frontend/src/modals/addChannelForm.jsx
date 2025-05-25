import { useRef, useEffect, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useAddChannelMutation } from '../slices/apiSlice.js';
import { useGetChannelsQuery } from '../slices/apiSlice.js';
import { closeModal } from '../slices/modalSlice.js';
import { setActiveChannel } from '../slices/activeChannelSlice.js';
import * as Yup from 'yup';

const AddChannelForm = () => {
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();
  const { data: channels = [] } = useGetChannelsQuery();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const channelNames = useMemo(() => 
    channels.map((channel) => channel.name.toLowerCase()),
  [channels]);

  const validationSchema = Yup.object({
  channelName: Yup.string()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .notOneOf(channelNames, 'Канал с таким именем уже существует'),
  });

  return (
    <Formik
    initialValues={{channelName: '',}}
    validationSchema={validationSchema}
    onSubmit={async (values) => {
      const { channelName } = values;
      try {
        const response = await addChannel({name: channelName});
        const { name, id } = response.data;
        dispatch(setActiveChannel({name, id}))
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(closeModal());
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
              placeholder="Имя канала"
              className={`mb-2 form-control ${touched.channelName && errors.channelName ? 'is-invalid' : ''}`}
              innerRef={inputRef}
            />
            <label className="visually-hidden" htmlFor="channelName">Имя канала</label>
            <ErrorMessage name="channelName" component="div" className="invalid-feedback" />
            <div className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={() => dispatch(closeModal())}>Отменить</button>
              <button type="submit" className="btn btn-primary">Отправить</button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddChannelForm;