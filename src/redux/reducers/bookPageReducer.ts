import { createSlice } from '@reduxjs/toolkit'
import { BookInfoType } from '../../types/types'
import { fetchBookInfoById } from '../thunks/thunks'

const initialState = {
    id: '',
    volumeInfo: {
        title: '',
        authors: [''],
        description: '',
        imageLinks: {},
        categories: ['']
    }
} as BookInfoType

//Slice отвечающий карточку определенной книги
const BookPageSlice = createSlice({
    name: 'bookPage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBookInfoById.fulfilled, (state, action) => {
            if ( action.payload) {
                return action.payload
            }
        })
    },
})

export default BookPageSlice.reducer