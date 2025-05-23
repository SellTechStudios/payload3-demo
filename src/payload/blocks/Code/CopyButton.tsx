'use client'

import { CopyIcon } from '@payloadcms/ui/icons/Copy'
import { useState } from 'react'

export function CopyButton({ code }: { code: string }) {
  const [text, setText] = useState('Copy')

  function updateCopyStatus() {
    if (text === 'Copy') {
      setText(() => 'Copied!')
      setTimeout(() => {
        setText(() => 'Copy')
      }, 1000)
    }
  }

  return (
    <div className="flex justify-end align-middle">
      <button
        className="flex gap-1 text-white hover:scale-110 transition-discrete transition-transform cursor-pointer"
        onClick={async () => {
          await navigator.clipboard.writeText(code)
          updateCopyStatus()
        }}
      >
        <p>{text}</p>
        <CopyIcon />
      </button>
    </div>
  )
}
