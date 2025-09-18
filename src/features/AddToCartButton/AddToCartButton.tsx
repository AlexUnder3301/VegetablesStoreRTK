import { useContext } from 'react';
import CartIcon from '../../assets/cart-icon.svg?react';
import styles from './style.module.scss';
import { Button } from '@mantine/core';
import { AppContext } from '../../shared/utils/context'; 
import type { DataItemType } from '../../shared/utils/types'

interface AddToCartButtonProps {
  stepperCount: number,
  data: DataItemType,
}

const AddToCartButton = ({ stepperCount, data }: AddToCartButtonProps) => {
  const { handleAddToCart } = useContext(AppContext)
  const product = {...data,
    quantity: stepperCount
  }

  return (
    <Button className={styles['cart-button']} onClick={() => {handleAddToCart(product)}}>
      <div className={styles['button-content']}>
        <span>Add to cart</span>
        <span><CartIcon className={styles['cart-icon']} /></span>
      </div>
    </Button>

  );
};
 
export default AddToCartButton;