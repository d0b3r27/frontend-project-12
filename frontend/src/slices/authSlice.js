import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('user')
// const parsedUser = storedUser ? JSON.parse(storedUser) : null

const initialState = {
  // username: parsedUser ? parsedUser.username : null,
  // token: parsedUser ? parsedUser.token : null,
  // isAuthenticated: !!parsedUser,
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload }) {
      const { username, token } = payload
      state.username = username
      state.token = token
      state.isAuthenticated = true
      localStorage.setItem('user', JSON.stringify(payload))
    },
    logout(state) {
      state.username = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('user')
    },
  },
})

export const { login, logout } = auth.actions
export default auth.reducer
