import clsx from 'clsx'
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes
} from 'react'
import { FieldError } from 'react-hook-form'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: FieldError
}

export const InputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (props, ref) => {
  const { className, name, error, ...rest } = props

  return (
    <div className="w-full flex flex-col">
      <input
        ref={ref}
        name={name}
        placeholder="https://mylongurl.com"
        className={clsx(
          'rounded-md min-h-fit max-h-20 px-1 w-full py-2 bg-white dark:bg-gray-600 dark:text-white shadow-md placeholder:text-gray-300',
          className
        )}
        {...rest}
      />

      {!!error && (
        <span className="text-sm text-red-400 mt-2">{error.message}</span>
      )}
    </div>
  )
}

export const Input = forwardRef(InputComponent)
