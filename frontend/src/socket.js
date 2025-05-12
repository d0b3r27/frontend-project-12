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

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
    };
  }, []);
};

export default useSocketEvents;