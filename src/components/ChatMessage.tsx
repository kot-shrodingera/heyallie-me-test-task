import { cn } from '../lib/utils'

export type ChatMessageProps = {
  sender: string
  text: string
  datetime: Date
}

function ChatMessage({ sender, text, datetime }: ChatMessageProps) {
  return (
    <div
      className={cn([
        'flex max-w-xs flex-col rounded-md px-4 py-2',
        sender === 'You'
          ? 'self-end bg-blue-500 text-white'
          : 'self-start bg-gray-200 text-gray-800',
      ])}
    >
      <div className="font-bold">{sender}</div>
      <div>{text}</div>
      <div className="mt-2 text-xs">{datetime.toLocaleString()}</div>
    </div>
  )
}

export default ChatMessage
