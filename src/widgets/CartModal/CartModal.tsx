import styles from './style.module.scss'
import Stepper from '../../shared/ui/Stepper/Stepper'
import { Image} from '@mantine/core'
import EmptyCart from '../../assets/cart-empty.svg?react'
import classNames from 'classnames'
import type { CardDataItemType } from '../../shared/utils/types'

interface CartModalProps {
    cart: CardDataItemType[],
    totalPrice: number
    setCart: React.Dispatch<React.SetStateAction<CardDataItemType[]>>
}



const CartModal = ({ cart, setCart, totalPrice }: CartModalProps) => {
    if (cart.length === 0) {
        return (
            <div className={classNames(styles['modal-container'], styles['modal-container--empty'])}>
                <EmptyCart />
                <span>Your cart is empty!</span>
            </div>
        )
    }

    return (
        <div className={styles['modal-container']}>
            <ul className={styles['modal-list']}>
                {cart.map((item) => {
                    const [name, weight = '1 kg'] = item.name.split(' - ')
                    return (
                        <li key={item.id} className={styles['list-item']}>
                            <Image src={item.image} className={styles['item-image']}></Image>
                            <div className={styles['border-section']}>
                                <div className={styles['item-data']}>
                                    <div className={styles['data-name']}>
                                        {name}
                                        <span>{weight}</span>
                                    </div>
                                    <div className={styles['data-price']}>{'$ ' + item.price}</div>
                                </div>
                                <Stepper quantity={item.quantity} onStep={(count) => {
                                    const newCart = [...cart]
                                    const newQuantitiyItemId = cart.findIndex((product) => product.id === item.id)
                                    if (count === 0) {
                                        newCart.splice(newQuantitiyItemId, 1)
                                    } else {
                                        newCart[newQuantitiyItemId].quantity = count
                                    }
                                    setCart(newCart)
                                }} />
                            </div>
                        </li>
                    )
                })}
            </ul>
            <footer className={styles['modal-footer']}>
                <span>Total:</span>
                <span>{'$ ' + totalPrice}</span>
            </footer>
        </div>
    )
}

export default CartModal