import { createSlice } from '@reduxjs/toolkit'

const initialState = { name: 'general', id: '1' }

const activeChannel = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    setActiveChannel(state, { payload }) {
      const { name, id } = payload
      state.name = name
      state.id = id
    },
    setActiveChannelDefault(state) {
      state.id = initialState.id
      state.name = initialState.name
    },
    setActiveChannelName(state, { payload }) {
      state.name = payload
    },
  },
})

export const { setActiveChannel, setActiveChannelDefault, setActiveChannelName } = activeChannel.actions
export default activeChannel.reducer
