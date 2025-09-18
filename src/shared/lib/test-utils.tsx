import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider>
      {children}
    </MantineProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export { customRender as render }