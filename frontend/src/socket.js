import { io } from 'socket.io-client';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from './slices/store';
import { chatApi } from './slices/apiSlice';
import { setActiveChannelDefault } from './slices/activeChannelSlice';

const socket = io();

const useSocketEvents = () => {
  const dispatch = useDispatch();
  const activeChannelId = useSelector((state) => state.activeChannel.id);
  const activeChannelIdRef = useRef(activeChannelId);

  useEffect(() => {
    activeChannelIdRef.current = activeChannelId;

    const handleNewMessage = (message) => {
      store.dispatch(
        chatApi.util.updateQueryData('getMessages', undefined, (draft) => {
          draft.push(message);
        })
      );
    };

    const handleNewChannel = (channel) => {
      store.dispatch(
        chatApi.util.updateQueryData('getChannels', undefined, (draft) => {
          draft.push(channel);
        })
      );
    };

    const handleEditChannel = (channel) => {
      store.dispatch(
        chatApi.util.updateQueryData('getChannels', undefined, (draft) => {
          const index = draft.findIndex((c) => c.id === channel.id);
          if (index !== -1) {
            draft[index].name = channel.name;
          }
        })
      );
    };

    const handleRemoveChannel = ({ id }) => {
      store.dispatch(
        chatApi.util.updateQueryData('getChannels', undefined, (draft) => {
          const index = draft.findIndex((c) => c.id === id);
          if (index !== -1) {
            draft.splice(index, 1);
          }
        })
      );

      if (id === activeChannelId) {
        dispatch(setActiveChannelDefault());
      }
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('renameChannel', handleEditChannel);
    socket.on('removeChannel', handleRemoveChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('renameChannel', handleEditChannel);
      socket.off('removeChannel', handleRemoveChannel);
    };
  }, [activeChannelId]);
};

export default useSocketEvents;