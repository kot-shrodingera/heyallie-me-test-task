import { TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      className={cn(['min-h-[80px] rounded-md border p-2', className])}
      {...props}
    />
  )
}

export default TextArea
