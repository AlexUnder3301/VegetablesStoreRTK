import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render } from '../../shared/lib/test-utils'
import AddToCartButton from './AddToCartButton'
import { AppContext } from '../../shared/utils/context'
import type { AppContextType } from '../../shared/utils/types'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

const mockContext: AppContextType = {
  handleAddToCart: vi.fn(),
  cart: [],
  handleCartModalSwitch: vi.fn(),
}

describe('AddToCartButton', () => {
  it('renders correctly', () => {
    render(
      <AppContext.Provider value={mockContext}>
        <AddToCartButton 
          stepperCount={1} 
          data={{
            id: 1,
            name: 'Test Product',
            price: 10,
            image: 'test.jpg',
            category: 'test'
          }} 
        />
      </AppContext.Provider>
    )

    expect(screen.getByText('Add to cart')).toBeInTheDocument()
  })

  it('calls handleAddToCart when clicked', async () => {
    const user = userEvent.setup()
    const mockHandleAddToCart = vi.fn()
    
    render(
      <AppContext.Provider value={{...mockContext, handleAddToCart: mockHandleAddToCart}}>
        <AddToCartButton 
          stepperCount={2} 
          data={{
            id: 1,
            name: 'Test Product',
            price: 10,
            image: 'test.jpg',
            category: 'test'
          }} 
        />
      </AppContext.Provider>
    )

    await user.click(screen.getByRole('button', { name: /add to cart/i }))

    expect(mockHandleAddToCart).toHaveBeenCalledWith({
      id: 1,
      name: 'Test Product',
      price: 10,
      image: 'test.jpg',
      category: 'test',
      quantity: 2
    })
  })
})