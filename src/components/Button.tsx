import clsx from 'clsx'
import { ButtonHTMLAttributes, ElementType } from 'react'
import { Spinner } from './Spinner'

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg'
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  content: string
  className?: string
  isLoading?: boolean
  leftIcon?: ElementType
  size?: keyof typeof sizes
}

export const Button = ({
  type,
  content,
  leftIcon,
  isLoading = false,
  className = '',
  size = 'md',
  ...rest
}: ButtonProps) => {
  return (
    <>
      {leftIcon}

      <button
        {...rest}
        type={type}
        className={clsx(
          'flex items-center justify-center rounded-md bg-blue-400 py-2 px-6 disabled:cursor-not-allowed cursor-pointer tracking-wider focus:outline-none hover:bg-blue-500 transition-colors shadow-md disabled:bg-gray-400 text-white font-bold',
          sizes[size],
          className
        )}
      >
        {isLoading ? <Spinner className="text-current" /> : <p>{content}</p>}
      </button>
    </>
  )
}