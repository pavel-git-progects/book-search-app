import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, RouteComponentProps } from 'react-router-dom'
import { fetchBookInfoById } from '../../redux/thunks/thunks'
import { AppDispatch, RootState } from '../../redux/store'
import styles from './styles.module.css'

//Детальная страница книги
const BookPage: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
    const { title, authors, imageLinks, categories, description } = useSelector((state: RootState) => state.bookPage.volumeInfo)
    const dispatch = useDispatch<AppDispatch>()

    //Запрос информации о книге
    React.useMemo(() => {
        dispatch(fetchBookInfoById(props.match.params.id))
    }, [props.match.params.id, dispatch])

    return (
        <div className={styles.container}>
            <div className={styles.imageBlock}>
                <img className={styles.image} alt='bookImage' src={imageLinks?.medium} />
            </div>
            <div className={styles.textContainer}>
                <div className={styles.goBackBlock}>
                    <span className={styles.categorie}>{categories?.join(" / ")}</span>
                    <NavLink style={{ textDecoration: 'none' }} to='/'><span className={styles.goBack}>Go Back</span></NavLink>
                </div>
                <h1>{title}</h1>
                <span className={styles.author}>{authors?.join(" / ")}</span>
                <div className={styles.description}>
                    {description}
                </div>
            </div>
        </div>
    )
}

export default BookPage