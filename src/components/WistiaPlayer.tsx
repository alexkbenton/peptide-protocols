'use client'

import { useEffect } from 'react'

interface WistiaPlayerProps {
  wistiaId: string
  playerColor?: string
  startTime?: number // seconds — the frame shown before playback
}

export default function WistiaPlayer({
  wistiaId,
  playerColor = '6b7f5e',
  startTime,
}: WistiaPlayerProps) {
  useEffect(() => {
    // Load Wistia E-V1 script once
    if (!document.querySelector('script[src*="E-v1.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://fast.wistia.com/assets/external/E-v1.js'
      script.async = true
      document.head.appendChild(script)
    }

    // Load media-specific JSON
    const mediaScriptId = `wistia-media-${wistiaId}`
    if (!document.getElementById(mediaScriptId)) {
      const mediaScript = document.createElement('script')
      mediaScript.id = mediaScriptId
      mediaScript.src = `https://fast.wistia.com/embed/medias/${wistiaId}.jsonp`
      mediaScript.async = true
      document.head.appendChild(mediaScript)
    }
  }, [wistiaId])

  return (
    <div
      className="wistia_responsive_padding"
      style={{ padding: '56.25% 0 0 0', position: 'relative' }}
    >
      <div
        className="wistia_responsive_wrapper"
        style={{
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
        }}
      >
        <div
          className={`wistia_embed wistia_async_${wistiaId} fitStrategy=contain playerColor=${playerColor} videoFoam=true${startTime !== undefined ? ` time=${startTime}` : ''}`}
          style={{ height: '100%', position: 'relative', width: '100%' }}
        >
          &nbsp;
        </div>
      </div>
    </div>
  )
}
