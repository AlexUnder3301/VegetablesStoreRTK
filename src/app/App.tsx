import { useState, useEffect } from 'react'
import './styles/App.css'
import ItemCard from './entities/ItemCard/ItemCard'
import PageHeader from '../widgets/PageHeader/PageHeader'
import { AppContext } from '../shared/utils/context'
import CartModal from '../widgets/CartModal/CartModal'
import fakeData from '../shared/utils/fakeData'
import type { CardDataItemType } from '../shared/utils/types'
import { useTypedDispatch, useTypedSelector } from '../shared/hooks/redux'
import { addToCart } from '../store/cartSlice'
import { getData } from '../store/dataSlice'


function App() {
  const { data, isLoading, error } = useTypedSelector(state => state.data)
  const cart = useTypedSelector((state) => state.cart.cart)

  const dispatch = useTypedDispatch()

  const [showCartModal, setShowCartModal] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getData())
  }, [])

  const handleCartModalSwitch = () => {
    setShowCartModal(!showCartModal)
  }

  const handleAddToCart = (product: CardDataItemType) => {
    const index: number = cart.findIndex(item => item.id === product.id)
    let newCart: CardDataItemType[] = [...cart]
    
    if (index === -1 && product.quantity !== 0) {
      newCart = [...newCart, product]
    } else if (product.quantity !== 0) {
      newCart[index] = {
        ...newCart[index],
        quantity: product.quantity
      };
    }
    dispatch(addToCart(newCart))
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{
      handleAddToCart: handleAddToCart,
      cart: cart,
      handleCartModalSwitch: handleCartModalSwitch
    }}>
      <PageHeader />
      {showCartModal && <CartModal />}
      <div className='shop-body'>
        <h2>Catalog</h2>
        <div className='card-container'>
          {isLoading ? fakeData.map((item) => {
            return (
              <ItemCard key={item.id} data={item} isLoading></ItemCard>
            ) 
          })
          : 
          data.map((item) => { 
            return(
              <ItemCard key={item.id} data={item}></ItemCard>
            ) 
          })}
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App