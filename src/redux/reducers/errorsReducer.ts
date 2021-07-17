import { createSlice } from '@reduxjs/toolkit'
import { ErrorStateType } from '../../types/types'

const initialState = {
    error: '',
} as ErrorStateType

interface ActionType {
    type: string
    payload: string
}

//Slice отвечающий за обработку ошибок
const ErrorsSlice = createSlice({
    name: 'bookPage',
    initialState,
    reducers: {
        setError(state, action: ActionType) {
            state.error = action.payload
        },
    }
})

export const { setError } = ErrorsSlice.actions
export default ErrorsSlice.reducer