import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeShowItems } from '../../redux/reducers/searchReducer'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchBooksByQuery } from '../../redux/thunks/thunks'
import { BookInfoType, DefaultStateType } from '../../types/types'
import BookItem from '../bookItem/bookItem'
import styles from './styles.module.css'
import { ProgressBarProvider } from 'react-redux-progress/ProgressBarProvider';

//Страница отображения списка книг 
const BooksPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { dataArray, showItems, isFetching }: DefaultStateType = useSelector((state: RootState) => state.search)
    const LoadMore = (): void => {
        const newShowItems: number = showItems + 30
        dispatch(changeShowItems(newShowItems))
        dispatch(fetchBooksByQuery(true))
    }
    const isHaveItems = (): boolean => dataArray.items === undefined ? false : true
    return (
        <main className={styles.main}>
            <ProgressBarProvider isActive={isFetching} />
            <div style={{ display: isHaveItems() ? 'none' : 'block' }}>
                <h1 className={styles.title}>Enter your query in the search bar</h1>
            </div>
            <div style={{ display: !isHaveItems() ? 'none' : 'block' }}>
                <h2 className={styles.title}>Found {dataArray.totalItems} results</h2>
                <div className={styles.contentBlock}>
                    {
                        dataArray.items?.map((el: BookInfoType) => {
                            return <BookItem {...el} key={el.id} />
                        })
                    }
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={LoadMore}>Load more</button>
                </div>
            </div>
        </main>
    )
}

export default BooksPage