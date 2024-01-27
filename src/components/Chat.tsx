import { useState } from 'react'
import { cn } from '../lib/utils'
import ChatMessage, { type ChatMessageProps } from './ChatMessage'
import Button from './ui/Button'
import TextArea from './ui/TextArea'

type ChatProps = {
  className: string
}

function Chat({ className }: ChatProps) {
  const [messages] = useState<ChatMessageProps[]>([
    {
      sender: 'You',
      text: 'Yours message',
      datetime: new Date('January 27, 2024, 10:00 AM'),
    },
    {
      sender: 'Server',
      text: 'Servers message',
      datetime: new Date('January 27, 2024, 10:05 AM'),
    },
    {
      sender: 'You',
      text: 'Yours very very very very very very very very very long message',
      datetime: new Date('January 27, 2024, 10:10 AM'),
    },
    {
      sender: 'Server',
      text: 'Servers very very very very very very very very very long message',
      datetime: new Date('January 27, 2024, 10:15 AM'),
    },
  ])

  return (
    <div className={cn([className, 'flex h-full flex-col'])}>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
      </div>
      <div className="flex gap-2 border-t p-4">
        <TextArea className="flex-1" placeholder="Type your message here" />
        <Button>Send</Button>
      </div>
    </div>
  )
}

export default Chat
