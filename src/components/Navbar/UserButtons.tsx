import React from 'react'
import { Button } from "@/components/ui/button";

interface UserButtonsProps {
  customClass?: string,
  handleLogout: () => void
}

function UserButtons({ customClass, handleLogout }: UserButtonsProps) {
  return (
    <>
      <div className={`flex gap-4 ${customClass}`}>
      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
      
      <Button variant="default">
        Dashboard
      </Button>
      </div>
    </>
  )
}

export default UserButtons
