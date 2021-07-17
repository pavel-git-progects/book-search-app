import React from 'react'
import { NavLink } from 'react-router-dom'
import { BookInfoType } from '../../types/types'
import styles from './styles.module.css'

//Карточка книги
const BookItem: React.FC<BookInfoType> = (props) => {
    const volumeInfo = props.volumeInfo

    const getImageUrl = () => {
        if (volumeInfo.imageLinks?.extraLarge) {
            return volumeInfo.imageLinks?.extraLarge
        } else if (volumeInfo.imageLinks?.large) {
            return volumeInfo.imageLinks?.large
        } else if (volumeInfo.imageLinks?.medium) {
            return volumeInfo.imageLinks?.medium
        } else if (volumeInfo.imageLinks?.small) {
            return volumeInfo.imageLinks?.small
        } else {
            return volumeInfo.imageLinks?.thumbnail
        }
    }
    return (
        <div className={styles.wrap}>
            <NavLink to={{ pathname: `/info/${props.id}`, state: props }} style={{ textDecoration: 'none' }} >
                <div className={styles.container}>
                    <img className={styles.image} alt='bookImage' src={getImageUrl()} />
                    <div className={styles.descriptionBlock}>
                        <div className={styles.categorie}>
                            {volumeInfo.categories?.join(' / ')}
                        </div>
                        <div className={styles.bookTitle}>
                            {volumeInfo.title}
                        </div>
                        <div className={styles.author}>
                            {volumeInfo.description?.slice(0, 150)}...
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default BookItem