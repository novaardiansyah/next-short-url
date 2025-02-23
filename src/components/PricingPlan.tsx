'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";

import { plans } from "@/data/PricingPlan";

export default function PricingPlan() {
  return (
    <section className="py-16 text-center bg-gray-100 dark:bg-gray-900 px-6" id="pricing">
      <h2 className="sm:text-[48px] text-[30px] font-bold text-gray-800 dark:text-white mb-3 leading-tight">
        Flexible plans for brands <br className="hidden sm:block" /> businesses of all scales
      </h2>
      <p className="sm:text-[20px] text-[16px] leading-tight text-gray-500 px-6 sm:px-0">Choose a plan that fits your needs, whether you're <br className="hidden sm:block" />a growing brand or a large enterprise.</p>

      <div className="flex flex-wrap justify-center gap-6 mt-12 sm:mt-20">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="w-80"
          >
            <Card className="p-6 shadow-md border border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
                <p className="text-xl text-gray-600 dark:text-gray-400">{plan.price}</p>
              </CardHeader>
              <CardContent>
                <ul className="text-left mb-4 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600 dark:text-gray-400">
                      <CircleCheckIcon className="text-cyan-500 rounded-full p-1 mb-[-2px]"/> {feature}
                    </li>
                  ))}

                  {plan.locked.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600 dark:text-gray-400">
                      <CircleXIcon className="text-red-500 rounded-full p-1 mb-[-2px]"/> {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-3">Choose Plan</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
