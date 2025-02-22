import React from 'react'
import { FreePlanBenefit } from '@/data/FreePlanBenefit'
import { CircleCheckIcon } from 'lucide-react';
interface FreePlanProps {
  activeTab: string;
}
function FreePlan({ activeTab}: FreePlanProps) {
  const newFreePlanBenefit = activeTab === 'shorten' ? FreePlanBenefit.shorturl : FreePlanBenefit.qrcode;

  return (
    <ul className="flex sm:flex-row flex-col justify-center items-center sm:gap-4 gap-2 sm:mt-8 mt-6">
      {newFreePlanBenefit.map((benefit, index) => (
        <li key={index} className="flex items-center">
          <CircleCheckIcon className="text-cyan-500 rounded-full p-1 mb-[-2px]"/> {benefit.title}
        </li>
      ))}
    </ul>
  )
}

export default FreePlan
