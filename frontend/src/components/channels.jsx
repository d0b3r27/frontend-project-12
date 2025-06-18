import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useGetChannelsQuery } from '../slices/apiSlice'
import { setActiveChannel } from '../slices/activeChannelSlice.js'
import { addChannelModal, editChannelModal, removeChannelModal } from '../slices/modalSlice.js'

const ChannelsList = ({ channels }) => {
  const activeChannelId = useSelector(state => state.activeChannel.id)
  const activeChannelRef = useRef(null)
  const dispatch = useDispatch()
  const [openedDropdownId, setOpenedDropdownId] = useState(null)
  const { t } = useTranslation()

  useEffect(() => {
    activeChannelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [activeChannelId])

  const handleActiveChannel = (name, id) => {
    dispatch(setActiveChannel({ name, id }))
  }

  const handleManageChannel = (id) => {
    setOpenedDropdownId(prevId => (prevId === id ? null : id))
  }

  const handleRemoveChannel = (id) => {
    dispatch(removeChannelModal(id))
    setOpenedDropdownId(null)
  }

  const handleEditChannel = (id) => {
    dispatch(editChannelModal(id))
    setOpenedDropdownId(null)
  }

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels?.map(({ name, id, removable }) => {
        const isActive = activeChannelId === id
        return (
          <li key={id} className="nav-item w-100" ref={isActive ? activeChannelRef : null}>
            <div className="d-flex dropdown btn-group" role="group">
              <button
                type="button"
                className={`w-100 rounded-0 text-start text-truncate btn ${isActive ? 'btn-secondary' : ''}`}
                onClick={() => handleActiveChannel(name, id)}
              >
                <span className="me-1">#</span>
                {name}
              </button>
              {removable
                && (
                  <>
                    <button
                      type="button"
                      className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${isActive ? 'btn-secondary' : ''}`}
                      aria-expanded="false"
                      aria-label="Channel managment"
                      onClick={() => handleManageChannel(id)}
                    >
                      <span className="visually-hidden">{t('channels.manage')}</span>
                    </button>
                    <div
                      data-x-placement="bottom-end"
                      className={`dropdown-menu ${openedDropdownId === id ? 'show' : ''}`}
                      style={{
                        position: 'absolute',
                        inset: '0px 0px auto auto',
                        transform: 'translate(0px, 40px)',
                      }}
                    >
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => handleRemoveChannel(id)}
                      >
                        {t('channels.remove')}
                      </button>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => handleEditChannel(id)}
                      >
                        {t('channels.rename')}
                      </button>
                    </div>
                  </>
                )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

const Channels = () => {
  const { data, error } = useGetChannelsQuery()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    if (error) {
      toast.error(t('toasty.networkError'))
    }
  }, [error, t])

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(addChannelModal())}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ChannelsList channels={data} />
    </div>
  )
}

export default Channels
