import React from 'react'

import styles from './styles.module.css'

//Подвал сайта
const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.text}>
                Created by Pavel Pyuyko<br/>
                pavelpliyiko2000@gmail.com<br/>
                2021
            </p>
        </footer>
    )
}

export default Footer