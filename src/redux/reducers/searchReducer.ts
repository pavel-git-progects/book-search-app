import { createSlice } from '@reduxjs/toolkit'
import { DefaultStateType } from '../../types/types'
import { fetchBooksByQuery } from '../thunks/thunks'

const initialState = {
    isFetching: false,
    showItems: 30,
    inputValue: "",
    dataArray: [],
    categories: "all",
    sortingBy: "relevance"
} as DefaultStateType

//Slice отвечающий за поиск и список книг
const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        changeCategories(state, action) {
            state.categories = action.payload
        },
        changeSorting(state, action) {
            state.sortingBy = action.payload
        },
        changeInputValue(state, action) {
            state.inputValue = action.payload
        },
        changeShowItems(state, action) {
            state.showItems = action.payload
        },
        changeFetching(state, action) {
            state.isFetching = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooksByQuery.fulfilled, (state, action) => {
            if (action.payload) {
                state.dataArray = action.payload
            } else {
                state.dataArray = {}
            }
            state.isFetching = false
        })
    },
})

export const { changeCategories, changeSorting, changeInputValue, changeShowItems, changeFetching } = SearchSlice.actions
export default SearchSlice.reducer