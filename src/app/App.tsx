import { useState, useEffect } from 'react'
import './styles/App.css'
import ky from 'ky'
import ItemCard from './entities/ItemCard/ItemCard'
import PageHeader from '../widgets/PageHeader/PageHeader'
import { AppContext } from '../shared/utils/context'
import CartModal from '../widgets/CartModal/CartModal'
import fakeData from '../shared/utils/fakeData'
import type { DataItemType, CardDataItemType } from '../shared/utils/types'


function App() {
  const [data, setData] = useState<DataItemType[]>([])
  const [cart, setCart] = useState<CardDataItemType[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showCartModal, setShowCartModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await ky.get('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json').json() as DataItemType[];
        setData(response);
      } catch (err) {
        setError('Failed to fetch data')
        console.error('Error fetching data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    getData()
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

    setCart(newCart)
  }

  useEffect(() => {
    const newPrice = cart.reduce((sum: number, current: CardDataItemType) => {
      return sum + (current.price * current.quantity)
    }, 0);
    setTotalPrice(newPrice)
  }, [cart])


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
      {showCartModal && <CartModal cart={cart} setCart={setCart} totalPrice={totalPrice} />}
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