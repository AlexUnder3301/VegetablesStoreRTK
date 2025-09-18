import { screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render } from '../../shared/lib/test-utils'
import PageHeader from './PageHeader'
import { AppContext } from '../../shared/utils/context'
import type { AppContextType } from '../../shared/utils/types'

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
  cart: [], // Добавляем пустую корзину
  handleCartModalSwitch: vi.fn(),
}

describe('PageHeader', () => {
  it('renders logo and cart button', () => {
    render(
      <AppContext.Provider value={mockContext}>
        <PageHeader />
      </AppContext.Provider>
    )

    expect(screen.getByTestId('logo'))
    expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument()
  })
})