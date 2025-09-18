import CartIcon from '../../assets/cart-icon.svg?react';
import styles from './style.module.scss';
import { Button } from '@mantine/core';
import { AppContext } from '../../shared/utils/context';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

const CartButton = () => { 
  const { handleCartModalSwitch, cart } = useContext(AppContext)
  const [isHidden, setIsHidden] = useState('count-items--hidden')
 
  useEffect(() => {
    if (cart.length === 0) {
      setIsHidden('count-items--hidden')
    } else {
      setIsHidden('')
    }
  }, [cart])

  return (
    <Button className={styles['cart-button']} onClick={handleCartModalSwitch}>
        <div className={styles['button-content']}>
          <span className={classNames(styles['count-items'], styles[isHidden])}>{cart.length}</span>
          <span className={styles['cart-text']}>Cart</span>
          <CartIcon className={styles['cart-icon']} />
      </div>
    </Button>
  );
};

export default CartButton;