import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render } from '../../shared/lib/test-utils'
import CartModal from './CartModal'
import type { CardDataItemType } from '../../shared/utils/types'

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

const mockSetCart = vi.fn()

describe('CartModal', () => {
  it('shows empty message when cart is empty', () => {
    render(<CartModal cart={[]} setCart={mockSetCart} totalPrice={0} />)

    expect(screen.getByText('Your cart is empty!')).toBeInTheDocument()
  })

  it('shows cart items when cart is not empty', () => {
    const cart: CardDataItemType[] = [
      {
        id: 1,
        name: 'Test Product - 1 kg',
        price: 10,
        image: 'test.jpg',
        category: 'test',
        quantity: 2
      }
    ]

    render(<CartModal cart={cart} setCart={mockSetCart} totalPrice={20} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('1 kg')).toBeInTheDocument()
    expect(screen.getByText('$ 10')).toBeInTheDocument()
    expect(screen.getByText('$ 20')).toBeInTheDocument()
  })

  it('updates item quantity correctly', async () => {
    const user = userEvent.setup()
    const cart: CardDataItemType[] = [
      {
        id: 1,
        name: 'Test Product - 1 kg',
        price: 10,
        image: 'test.jpg',
        category: 'test',
        quantity: 1
      }
    ]

    render(<CartModal cart={cart} setCart={mockSetCart} totalPrice={10} />)

    const incrementButton = screen.getByTestId('increment')
    await user.click(incrementButton)

    expect(mockSetCart).toHaveBeenCalledWith([{
      id: 1,
      name: 'Test Product - 1 kg',
      price: 10,
      image: 'test.jpg',
      category: 'test',
      quantity: 2
    }])
  })

  it('removes item when quantity is set to 0', async () => {
    const user = userEvent.setup()
    const cart: CardDataItemType[] = [
      {
        id: 1,
        name: 'Test Product - 1 kg',
        price: 10,
        image: 'test.jpg',
        category: 'test',
        quantity: 1
      }
    ]

    render(<CartModal cart={cart} setCart={mockSetCart} totalPrice={10} />)

    const decrementButton = screen.getByTestId('decrement')
    await user.click(decrementButton)

    expect(mockSetCart).toHaveBeenCalledWith([])
  })
})