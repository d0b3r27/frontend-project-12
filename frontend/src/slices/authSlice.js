import { createSlice } from '@reduxjs/toolkit'

const loadUserFromStorage = () => {
  try {
    const raw = localStorage.getItem('user')
    if (!raw) return null

    const parsed = JSON.parse(raw)

    if (typeof parsed !== 'object' || !parsed.token || !parsed.username) {
      throw new Error('Неправильная структура localStorage["user"]')
    }

    return parsed
  }
  catch (err) {
    console.warn('Ошибка загрузки user из localStorage:', err)
    localStorage.removeItem('user')
    return null
  }
}

const parsedUser = loadUserFromStorage()

const initialState = {
  username: parsedUser?.username ?? null,
  token: parsedUser?.token ?? null,
  isAuthenticated: Boolean(parsedUser),
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
      try {
        localStorage.setItem('user', JSON.stringify(payload))
      }
      catch (err) {
        console.warn('Ошибка сохранения user в localStorage:', err)
      }
    },
    logout(state) {
      state.username = null
      state.token = null
      state.isAuthenticated = false
      try {
        localStorage.removeItem('user')
      }
      catch (err) {
        console.warn('Ошибка удаления user из localStorage:', err)
      }
    },
  },
})

export const { login, logout } = auth.actions
export default auth.reducer
