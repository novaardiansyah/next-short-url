'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Turnstile from "react-turnstile";
import { useState } from "react";
export default function Contact() {
  const [captchaKey, setCaptchaKey] = useState<number>(0)
  const [token, setToken] = useState<string | null>(null)

  return (
    <section id="contact" className="py-16 text-center bg-gray-100 dark:bg-gray-900">
      <h2 className="sm:text-[48px] text-[30px] font-bold text-gray-800 dark:text-white mb-3 leading-tight">
        Get in Touch With <br className="block sm:hidden" />Our Team
      </h2>
      <p className="sm:text-[20px] text-[16px] leading-tight text-gray-500 px-6 sm:px-0">
        Looking for a custom plan? We're here to help! Fill out the form<br className="hidden sm:block" /> below, and let's find the best solution for you
      </p>

      <div className="max-w-xl mx-auto mt-12 sm:mt-16 px-4">
        <Card className="p-4 sm:p-6 shadow-md">
          <CardContent>
            <h3 className="text-xl sm:text-2xl font-semibold mt-3 sm:mt-0">Let us know your needs</h3>
            <form className="flex flex-col gap-5 mt-10">
              <Input type="text" className="py-5" placeholder="Your Name" required />
              <Input type="email" className="py-5" placeholder="Your email (ex. email@example.com)" required />
              <Textarea placeholder="Your Message" rows={5} required />
              <Turnstile
                sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
                onVerify={(token) => setToken(token)}
                key={captchaKey}
                className="flex justify-start"
              />
              <Button type="submit" className="w-full">Drop Us a Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
