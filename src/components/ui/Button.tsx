import { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn([
        'cursor-pointer rounded-md border px-4 py-2 font-medium hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-50',
        className,
      ])}
      {...props}
    ></button>
  )
}

export default Button
