import React, { ChangeEvent, useMemo } from 'react'
import styles from './styles.module.css'
import { AppDispatch, RootState } from '../../redux/store'
import SearchIcon from './assets/images/search.svg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooksByQuery } from '../../redux/thunks/thunks'
import { changeCategories, changeInputValue, changeShowItems, changeSorting, changeFetching } from '../../redux/reducers/searchReducer'
import ErrorComponent from '../error/error'

//Шапка сайта
const Header: React.FC = () => {
    const { error } = useSelector((state: RootState) => state.error)
    const ErrorFunction = useMemo(() => {
        if (error) {
            return <ErrorComponent error={error} isShow={true} />
        }
    }, [error])

    const { inputValue, sortingBy, categories } = useSelector((state: RootState) => state.search)
    const dispatch = useDispatch<AppDispatch>()

    const InputOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.value === "") {
            dispatch(changeShowItems(30))
        }
        dispatch(changeInputValue(event.target.value))
    }

    const CategoriesOnChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        dispatch(changeCategories(event.target.value))
    }

    const SortingOnChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        dispatch(changeSorting(event.target.value))
    }

    const searchOnClick = (): void => {
        dispatch(changeFetching(true))
        dispatch(fetchBooksByQuery(false ))
    }
    return (
        <header className={styles.header}>
            {ErrorFunction}
            <span className={styles.title}>Search for books</span>
            <div className={styles.searchBlock}>
                <div className={styles.seacrhInputBlock}>
                    <input className={styles.seacrhInput} onChange={InputOnChange} onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' ? searchOnClick() : null} value={inputValue} />
                    <img src={SearchIcon} className={styles.searchIcon} alt='searchIcon' onClick={searchOnClick} />
                </div>
                <div className={styles.sortingContainer}>
                    <div className={styles.sortingItem}>
                        <span>Categories</span>
                        <select className={styles.select} onChange={CategoriesOnChange} value={categories}>
                            <option value="all">all</option>
                            <option value="art">art</option>
                            <option value="biography">biography</option>
                            <option value="computers">computers</option>
                            <option value="history">history</option>
                            <option value="medical">medical</option>
                            <option value="poetry">poetry</option>
                        </select>
                    </div>
                    <div className={styles.sortingItem}>
                        <span>Sorting by</span>
                        <select className={styles.select} onChange={SortingOnChange} value={sortingBy}>
                            <option value="relevance">relevance</option>
                            <option value="newest">newest</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header