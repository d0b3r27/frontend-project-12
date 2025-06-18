/* eslint-disable no-param-reassign */
import { io } from 'socket.io-client'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import store from '../slices/store'
import { chatApi } from '../slices/apiSlice'
import { setActiveChannelDefault } from '../slices/activeChannelSlice'

const socket = io()

const useSocketEvents = () => {
  const dispatch = useDispatch()
  const activeChannelId = useSelector((state) => state.activeChannel.id)
  const activeChannelIdRef = useRef(activeChannelId)
  const { t } = useTranslation()

  useEffect(() => {
    activeChannelIdRef.current = activeChannelId

    const handleNewMessage = (message) => {
      try {
        store.dispatch(
          chatApi.util.updateQueryData('getMessages', undefined, (draft) => {
            draft.push(message)
          }),
        )
      }
      catch (error) {
        console.error(t('errors.socket.newMessage'), error)
        toast.error(t('errors.socket.newMessage'))
      }
    }

    const handleNewChannel = (channel) => {
      try {
        store.dispatch(
          chatApi.util.updateQueryData('getChannels', undefined, (draft) => {
            draft.push(channel)
          }),
        )
      }
      catch (error) {
        console.error(t('errors.socket.newChannel'), error)
        toast.error(t('errors.socket.newChannel'))
      }
    }

    const handleEditChannel = (channel) => {
      try {
        store.dispatch(
          chatApi.util.updateQueryData('getChannels', undefined, (draft) => {
            const index = draft.findIndex((c) => c.id === channel.id)
            if (index !== -1) {
              draft[index].name = channel.name
            }
          }),
        )
      }
      catch (error) {
        console.error(t('errors.socket.renameChannel'), error)
        toast.error(t('errors.socket.renameChannel'))
      }
    }

    const handleRemoveChannel = ({ id }) => {
      try {
        store.dispatch(
          chatApi.util.updateQueryData('getChannels', undefined, (draft) => {
            const index = draft.findIndex((c) => c.id === id)
            if (index !== -1) {
              draft.splice(index, 1)
            }
          }),
        )

        if (id === activeChannelIdRef.current) {
          dispatch(setActiveChannelDefault())
        }
      }
      catch (error) {
        console.error(t('errors.socket.removeChannel'), error)
        toast.error(t('errors.socket.removeChannel'))
      }
    }

    socket.on('connect', () => {
      console.log(t('errors.socket.connect'))
    })

    socket.on('connect_error', (err) => {
      console.error(t('errors.socket.connectError'), err)
      toast.error(t('errors.socket.connectError'))
    })

    socket.on('disconnect', (reason) => {
      console.warn(t('errors.socket.disconnect'), reason)
      toast.warning(t('errors.socket.disconnect'))
    })

    socket.on('newMessage', handleNewMessage)
    socket.on('newChannel', handleNewChannel)
    socket.on('renameChannel', handleEditChannel)
    socket.on('removeChannel', handleRemoveChannel)

    return () => {
      socket.off('connect')
      socket.off('connect_error')
      socket.off('disconnect')
      socket.off('newMessage', handleNewMessage)
      socket.off('newChannel', handleNewChannel)
      socket.off('renameChannel', handleEditChannel)
      socket.off('removeChannel', handleRemoveChannel)
    }
  }, [activeChannelId, dispatch, t])
}

export default useSocketEvents
