import { render } from '@testing-library/react'
import ChatMessage, { ChatMessageProps } from './ChatMessage'

describe('ChatMessage', () => {
  const props: ChatMessageProps = {
    sender: 'You',
    text: 'Hello, world!',
    datetime: new Date('2024-01-28T07:45:20.000Z'),
  }

  it('should render the sender, text and datetime', () => {
    const { getByText } = render(<ChatMessage {...props} />)
    expect(getByText('You')).toBeInTheDocument()
    expect(getByText('Hello, world!')).toBeInTheDocument()
    expect(getByText(props.datetime.toLocaleString())).toBeInTheDocument()
  })
})
