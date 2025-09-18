import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render } from '../../shared/lib/test-utils'
import CartButton from './CartButton'
import { AppContext } from '../../shared/utils/context'
import type { AppContextType, CardDataItemType } from '../../shared/utils/types'

// Мок для matchMedia
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

describe('CartButton', () => {
  it('renders correctly with empty cart', () => {
    render(
      <AppContext.Provider value={mockContext}>
        <CartButton />
      </AppContext.Provider>
    )

    expect(screen.getByText('Cart')).toBeInTheDocument()
    // expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('renders correctly with items in cart', () => {
    const cart: CardDataItemType[] = [
      {
        id: 1,
        name: 'Test Product',
        price: 10,
        image: 'test.jpg',
        category: 'test',
        quantity: 2
      }
    ]

    render(
      <AppContext.Provider value={{...mockContext, cart}}>
        <CartButton />
      </AppContext.Provider>
    )

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('calls handleCartModalSwitch when clicked', async () => {
    const user = userEvent.setup()
    const mockHandleCartModalSwitch = vi.fn()
    
    render(
      <AppContext.Provider value={{...mockContext, handleCartModalSwitch: mockHandleCartModalSwitch}}>
        <CartButton />
      </AppContext.Provider>
    )

    await user.click(screen.getByRole('button', { name: /cart/i }))

    expect(mockHandleCartModalSwitch).toHaveBeenCalledTimes(1)
  })
})