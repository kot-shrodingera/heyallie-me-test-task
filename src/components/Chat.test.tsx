import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Chat from './Chat'

describe('Chat component', () => {
  test('should render chat input and send button', () => {
    render(<Chat />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('should send message and receive echo', async () => {
    render(<Chat />)

    await waitFor(() => {
      expect(screen.getByRole('button')).not.toBeDisabled()
    })

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Hello' } })

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(await screen.findByText('Hello')).toBeInTheDocument()
    expect(await screen.findByText('echo: Hello')).toBeInTheDocument()
  })
})
