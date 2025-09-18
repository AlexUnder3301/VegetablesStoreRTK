import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render } from '../../lib/test-utils'
import Stepper from './Stepper'

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

describe('Stepper', () => {
  it('renders with initial quantity', () => {
    const mockOnStep = vi.fn()
    render(<Stepper onStep={mockOnStep} quantity={3} />)

    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('increments quantity when plus button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnStep = vi.fn()
    render(<Stepper onStep={mockOnStep} quantity={1} />)

    const incrementButton = screen.getByTestId('increment')
    await user.click(incrementButton)

    expect(mockOnStep).toHaveBeenCalledWith(2)
  })

  it('decrements quantity when minus button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnStep = vi.fn()
    render(<Stepper onStep={mockOnStep} quantity={2} />)

    const decrementButton = screen.getByTestId('decrement')
    await user.click(decrementButton)

    expect(mockOnStep).toHaveBeenCalledWith(1)
  })

  it('does not decrement below 0', async () => {
    const user = userEvent.setup()
    const mockOnStep = vi.fn()
    render(<Stepper onStep={mockOnStep} quantity={0} />)

    const decrementButton = screen.getByTestId('decrement')
    await user.click(decrementButton)

    expect(mockOnStep).not.toHaveBeenCalled()
  })
})