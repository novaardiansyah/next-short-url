'use client'
import React, { useState } from 'react'
import Turnstile from 'react-turnstile'

interface CaptchaProps {
  setToken: (token: string) => void
  captchaKey: number
}
function Captcha({ setToken, captchaKey }: CaptchaProps) {
  return (
    <Turnstile
      sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
      onVerify={(token) => setToken(token)}
      key={captchaKey}
      className="flex justify-start"
    />
  )
}

export default Captcha
