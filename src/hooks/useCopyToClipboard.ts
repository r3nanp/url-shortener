import { useCallback, useState } from 'react'

type CopiedValue = string | null

type CopyFn = (text: string) => Promise<boolean>

export const useCopyToClipboard = (): [CopiedValue, CopyFn] => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = useCallback(async (text: string) => {
    if (!navigator?.clipboard) return false

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (e) {
      setCopiedText(null)
      return false
    }
  }, [])

  return [copiedText, copy]
}
