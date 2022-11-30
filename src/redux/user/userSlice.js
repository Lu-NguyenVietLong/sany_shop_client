import { createSlice } from '@reduxjs/toolkit'

// const items = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : []

const initialState = {
    user: null,
    token: {
        accessToken: '',
        refreshToken: ''
    }
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            // const newItem = action.payload
            // const item = state.value.filter(e => e.id === newItem.id)

            // if (item.length > 0)
            // {
            //     state.value = state.value.filter(e => e.id !== newItem.id)
            //     state.value = [...state.value, {
            //         id: item[0].id,
            //         email: newItem.email
            //     }]
            // }
        },
        setCredentials: (state,action)=> {
            state.user = action.payload.user
            localStorage.setItem('token', JSON.stringify(action.payload.token))
            state.token = action.payload.token

        }

    }
})

export const { updateUser,setCredentials } = userSlice.actions
export const selectAuth = (state)=> state.auth
export default userSlice.reducer