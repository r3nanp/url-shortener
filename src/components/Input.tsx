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
          'rounded-md min-h-fit max-h-20 px-1 w-full py-2 bg-white shadow-md',
          className
        )}
        {...rest}
      />

      {!!error && <p className="text-sm text-red-400 mt-2">{error.message}</p>}
    </div>
  )
}

export const Input = forwardRef(InputComponent)
