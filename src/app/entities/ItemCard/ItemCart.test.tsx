import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render } from '../../../shared/lib/test-utils'
import ItemCard from './ItemCard'
import { AppContext } from '../../../shared/utils/context'
import type { AppContextType } from '../../../shared/utils/types'

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

const mockData = {
  id: 1,
  name: 'Test Product - 1 kg',
  price: 10,
  image: 'test.jpg',
  category: 'test'
}

describe('ItemCard', () => {
  it('renders correctly', () => {
    render(
      <AppContext.Provider value={mockContext}>
        <ItemCard data={mockData} />
      </AppContext.Provider>
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('1 kg')).toBeInTheDocument()
    expect(screen.getByText('$ 10')).toBeInTheDocument()
  })



  it('updates stepper count correctly', async () => {
    const user = userEvent.setup()
    
    render(
      <AppContext.Provider value={mockContext}>
        <ItemCard data={mockData} />
      </AppContext.Provider>
    )

    const incrementButton = screen.getByTestId('increment')
    await user.click(incrementButton)

    expect(screen.getByText('2')).toBeInTheDocument()
  })
})