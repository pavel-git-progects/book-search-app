import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookInfoType, BooksArray } from "../../types/types";
import { setError } from "../reducers/errorsReducer";
import { changeShowItems } from "../reducers/searchReducer";
import { RootState } from '../store'

//Google API key
const API_KEY: string = "AIzaSyC8fBQJp3r8oi9pOpKfc1prWKz-MMmQPx4"

//Получение списка книг по запросу
export const fetchBooksByQuery = createAsyncThunk<BooksArray | undefined | null, boolean, { state: RootState }>(
    'search/fetchBooksByQueryStatus',
    async (/*{ query, categories, sorting, loadMore },*/ loadMore , thunkAPI) => {
        const sorting = thunkAPI.getState().search.sortingBy
        const query = thunkAPI.getState().search.inputValue
        const categories = thunkAPI.getState().search.categories
        if (query !== "") {
            try {
                //Если это запрос на первичное получение данных
                if (loadMore === false) {
                    const resp: Response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}${categories === "all" ? '' : `+subject:${categories}`}&maxResults=30&startIndex=0&orderBy=${sorting}&key=${API_KEY}`)
                    if (resp.ok) {
                        let json: BooksArray = await resp.json();
                        return json
                    } else {
                        thunkAPI.dispatch(setError(`Ошибка HTTP: ${resp.status} \n ${new Date()}`))
                        console.log(`Ошибка HTTP: ${resp.status}`);
                    }
                }
                //Если это запрос на подгрузку следующих 30 книг
                else {
                    let data: BooksArray = thunkAPI.getState().search.dataArray
                    //Если есть что подгружать (если еще не все книги отображены) то подгружаем следующие 30
                    if (data.items?.length && data.totalItems && data.totalItems - data.items?.length > 0) {
                        const resp: Response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}${categories === "all" ? '' : `+subject:${categories}`}&maxResults=30&startIndex=${data.items?.length}&orderBy=${sorting}&key=${API_KEY}`)
                        if (resp.ok) {
                            let json: BooksArray = await resp.json();
                            if (json.items && data?.items) {
                                json.items = json.items.concat(data?.items)
                                return json
                            }
                            //Если нет книг то возвращаем прошлый список
                            return data
                        } else {
                            thunkAPI.dispatch(setError(`Ошибка HTTP: ${resp.status} ${new Date()}`))
                            console.log("Ошибка HTTP: " + resp.status);
                        }
                    } else {
                        //Если нечего подгружать то возвращаем прошлый список
                        thunkAPI.dispatch(setError(`All books given ${new Date()}`))
                        return data
                    }
                }
            } catch (e) {
                thunkAPI.dispatch(setError(e))
                console.log(e)
            }
        } else {
            thunkAPI.dispatch(setError(`Enter your query. ${new Date()}`))
            thunkAPI.dispatch(changeShowItems(30))
            return null
        }
    }
)

//Получение данных о книге по ID
export const fetchBookInfoById = createAsyncThunk<BookInfoType | undefined | null, string, { state: RootState }>(
    'bookPage/fetchBookInfoByIdStatus',
    async (id, thunkAPI) => {
        try {
            const resp: Response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
            if (resp.ok) {
                let json: BookInfoType = await resp.json();
                return json
            } else {
                thunkAPI.dispatch(setError(`Ошибка HTTP: ${resp.status} ${new Date()}`))
                console.log("Ошибка HTTP: " + resp.status);
            }
        } catch (e) {
            thunkAPI.dispatch(setError(e))
            console.log(e)
        }
    }
)