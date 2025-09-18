import styles from './style.module.scss'
import Logo from '../../assets/logo.svg?react'
import CartButton from '../../features/CartButton/CartButton'

const PageHeader = () => {
    return (
        <header className={styles['page-header']}>
            <Logo data-testid='logo'></Logo>
            <CartButton />
        </header>
    )
}

export default PageHeader