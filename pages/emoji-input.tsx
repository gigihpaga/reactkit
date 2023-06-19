import type { NextPage } from 'next'
import { DemoPage } from 'components/DemoPage'
import { useState } from 'react'
import { EmojiInput } from 'lib/ui/inputs/EmojiInput'

const EmojiInputPage: NextPage = () => {
  const [value, setValue] = useState('👍')

  return (
    <DemoPage title="Emoji Input">
      <EmojiInput value={value} onChange={setValue} />
    </DemoPage>
  )
}

export default EmojiInputPage
