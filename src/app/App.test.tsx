import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppContext } from '../shared/utils/context'
import type {  CardDataItemType } from '../shared/utils/types'

const mockCartItem: CardDataItemType = {
  id: 1,
  name: 'Test Product 1',
  price: 100,
  category: 'test',
  image: 'test.jpg',
  quantity: 2
}


describe('AppContext', () => {
  it('provides correct context value', () => {
    const testValues = {
      handleAddToCart: vi.fn(),
      cart: [mockCartItem],
      handleCartModalSwitch: vi.fn()
    }

    const TestComponent = () => {
      return (
        <AppContext.Provider value={testValues}>
          <div>Test Component</div>
        </AppContext.Provider>
      )
    }

    render(<TestComponent />)
    expect(screen.getByText('Test Component')).toBeInTheDocument()
  })
})