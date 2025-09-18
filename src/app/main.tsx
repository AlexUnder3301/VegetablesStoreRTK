import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  colors: {
    gray: [
      '#FFFFFF',
      '#F3F5FA',
      '#E9ECEF',
      '#DEE2E6', 
      '#CED4DA',
      '#CED4DA',
      '#868E96',
      '#495057',
      '#343A40',
      '#212529'
    ],

    green: [
      "#eafbee",
      "#dbf2e0",
      "#b9e1c2",
      "#94d0a1",
      "#74c186",
      "#60b874",
      "#54b46a",
      "#449e59",
      "#398d4d",
      "#2a7a3f"
]
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
)
