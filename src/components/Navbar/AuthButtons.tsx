'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import AuthDialog from '@/components/AuthDialog';

interface AuthButtonsProps {
  customClass?: string
}
function AuthButtons({ customClass }: AuthButtonsProps) {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleDialog = (isLogin: boolean) => {
    setIsLogin(isLogin);
    setOpen(true);
  };

  return (
    <>
      <div className={`flex gap-4 ${customClass}`}>
        <Button variant="outline" onClick={() => handleDialog(true)}>Log in</Button>
        <Button onClick={() => handleDialog(false)}>Sign Up for free</Button>
      </div>

      <AuthDialog open={open} setOpen={setOpen} isLogin={isLogin} setIsLogin={setIsLogin} />
    </>
  )
}

export default AuthButtons
