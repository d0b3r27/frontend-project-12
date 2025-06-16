import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { cleanText } from '../utils/profanityFilter.js';
import { useGetMessagesQuery, useAddMessageMutation } from '../slices/apiSlice';

const Messages = () => {
  const { data, error } = useGetMessagesQuery();
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const [message, setMessage] = useState('');
  const nickname = useSelector((state) => state.auth.username);
  const { name: channelName, id: activeChannelId } = useSelector((state) => state.activeChannel);
  const { t } = useTranslation();
  const activeChannelMessages = data?.filter(({ channelId }) => channelId === activeChannelId);
  const lastMessageRef = useRef(null);
  const inputRef = useRef();

  const inputHandler = (e) => {
    setMessage(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const cleanMessage = cleanText(message);
    try {
      await addMessage({ body: cleanMessage, channelId: activeChannelId, username: nickname });
      setMessage('');
    } catch {
      toast.error(t('toasty.networkError'));
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(t('toasty.networkError'));
    }
  }, [error, t]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [activeChannelMessages]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {` ${channelName}`}
            </b>
          </p>
          <span className="text-muted">{t('messages.count', { count: activeChannelMessages?.length ?? 0 })}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {activeChannelMessages?.map(({ id, username, body }, index) => (
            <div key={id} className="text-break mb-2" ref={index === activeChannelMessages.length - 1 ? lastMessageRef : null}>
              <b>{username}</b>
              :
              {` ${body}`}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <form noValidate="" onSubmit={submitHandler} className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input
                name="body"
                ref={inputRef}
                aria-label="Новое сообщение"
                placeholder={t('messages.inputMessage')}
                className="border-0 p-0 ps-2 form-control"
                value={message}
                onChange={inputHandler}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-group-vertical"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                </svg>
                <span className="visually-hidden">{t('messages.send')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
