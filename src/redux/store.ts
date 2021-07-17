import { configureStore } from '@reduxjs/toolkit'
import bookPageReducer from './reducers/bookPageReducer';
import errorsReducer from './reducers/errorsReducer';
import searchReducer from './reducers/searchReducer'

const store = configureStore({
    reducer: {
        search: searchReducer ,
        bookPage: bookPageReducer,
        error: errorsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store