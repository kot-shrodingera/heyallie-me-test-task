import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/utils'
import ChatMessage, { type ChatMessageProps } from './ChatMessage'
import Button from './ui/Button'
import TextArea from './ui/TextArea'

type ChatProps = {
  className?: string
}

type Status = 'openned' | 'closed'

function Chat({ className }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessageProps[]>([])
  const [status, setStatus] = useState<Status>('closed')

  const isOpenned = status === 'openned'

  const addMessage = (message: string, sender: string) => {
    setMessages((prev) => [
      ...prev,
      {
        sender,
        text: message,
        datetime: new Date(),
      },
    ])
  }

  const connection = useRef<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000')
    connection.current = socket

    socket.addEventListener('open', () => {
      console.log('Socket openned')
      setStatus('openned')
    })

    socket.addEventListener('message', (event) => {
      addMessage(event.data as string, 'Server')
    })

    socket.addEventListener('close', () => {
      console.log('Socket closed')
      setStatus('closed')
    })

    return () => {
      socket.close()
      connection.current = null
    }
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const input = event.currentTarget.elements.namedItem(
      'message',
    ) as HTMLTextAreaElement
    const message = input.value
    if (connection.current !== null) {
      addMessage(message, 'You')
      connection.current.send(message)
      input.value = ''
    }
  }

  return (
    <div className={cn([className, 'flex h-full flex-col'])}>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
      </div>
      <div
        className={cn([
          'flex justify-center p-2 text-sm font-bold',
          isOpenned ? 'text-green-500' : 'text-red-500',
        ])}
      >
        {isOpenned ? 'Connected' : 'Not Connected'}
      </div>
      <form className="flex gap-2 border-t p-4" onSubmit={handleSubmit}>
        <TextArea
          className="flex-1"
          placeholder="Type your message here"
          name="message"
        />
        <Button type="submit" disabled={!isOpenned}>
          Send
        </Button>
      </form>
    </div>
  )
}

export default Chat
