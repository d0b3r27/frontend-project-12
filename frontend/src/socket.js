import { io } from 'socket.io-client';
import { useEffect } from 'react';
import store from './slices/store';
import { chatApi } from './slices/apiSlice';

const socket = io();

const useSocketEvents = () => {
  useEffect(() => {
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
  }, []);
};

export default useSocketEvents;