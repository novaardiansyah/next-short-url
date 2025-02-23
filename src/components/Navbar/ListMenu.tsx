'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { menus } from '@/data/Menu'

type Props = {
  withIcon?: boolean,
  hideOnMobileClick?: Function
  activeSection?: string
}
function ListMenu({ withIcon = true, hideOnMobileClick }: Props) {
  const [activeSection, setActiveSection] = useState('')

  const handleClick = (active: string) => {
    hideOnMobileClick && hideOnMobileClick()
    if (withIcon) setActiveSection(active)
  }

  return (
    <>
      {menus.map((menu, index) => (
        <Link 
          href={menu.link} 
          className={`${activeSection == menu.link ? 'dark:text-gray-300 text-gray-800' : 'dark:text-gray-400 text-gray-500'} hover:text-gray-800 dark:hover:text-gray-300 flex items-center gap-2`} 
          key={index} 
          onClick={() => handleClick(menu.link)}>
          {withIcon && menu.icon} {menu.title}
        </Link>
      ))}
    </>
  )
}

export default ListMenu
