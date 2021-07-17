import React from 'react'
import { ErrorStateType } from '../../types/types'
import { CSSTransition } from 'react-transition-group'
import { useDispatch } from 'react-redux'
import { setError } from '../../redux/reducers/errorsReducer'
import styles from './styles.module.css'

const ErrorComponent: React.FC<ErrorStateType> = (props) => {
    const dispatch = useDispatch()
    const CloseOnClick = () => {
        dispatch(setError(''))
    }

    return (
        <CSSTransition
            in={true}
            timeout={300}
            classNames="alert"
            unmountOnExit
        >
            <div className={styles.container}>
                {props.error}
                <button onClick={CloseOnClick}>CLOSE</button>
            </div>
        </CSSTransition>
    )
}

export default ErrorComponent