'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/context/auth-context';
import { clientFetch } from '@/lib/clientFetch';
import { ButtonLoading } from '../ui/button/ButtonLoading';
import { toast } from "sonner"
import Captcha from '../Captcha';

interface ShortenCardProps {
  setOpenLoginDialog: (open: boolean) => void;
}
function ShortenCard({ setOpenLoginDialog }: ShortenCardProps) {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null)
  const [captchaKey, setCaptchaKey] = useState<number>(0)
  const { user } = useAuth();

  const handleShorten = async (): Promise<void> => {
    if (!user) return setOpenLoginDialog(true)
    
    // ! check if is not valid url
    if (!url || !url.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)) {
      toast.error('Please enter a valid URL to shorten.');
      return;
    }

    setIsLoading(true)

    try {
      const res = await clientFetch('/url-short', {
        method: 'POST',
        body: JSON.stringify({ action: 'store', original_url: url, captcha_token: token }),
      })

      const data = await res.json()

      if (res.status === 201 || res.status === 409) {
        setShortenedUrl(`${process.env.NEXT_PUBLIC_SHORT_DOMAIN}/${data?.data?.short}`);
        return
      }
      
      let error = 'Something went wrong, please try again.'
      if (res.status === 422) {
        error = data?.message || data[Object.keys(data)[0]][0]
      }

      toast.error(error)
    } finally {
      setCaptchaKey(Math.random())
      setToken(null)
      return setIsLoading(false)
    }
  };

  return (
    <Card>
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-0 pb-0">Shorten your URL</h1>
          <p className="text-xs sm:text-sm text-gray-400">Make it short and sweet</p>
        </div>

        <h2 className="text-md font-semibold">Just drop your long link here</h2>

        <Input
          placeholder="https://example.com/very-long-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full py-4 sm:py-6 border rounded"
        />

        <Captcha setToken={setToken} captchaKey={captchaKey} />
        {isLoading ? <ButtonLoading /> : <Button className="py-4 sm:py-6" onClick={handleShorten}>Get Shortened URL</Button>}
        
        {shortenedUrl && user && (
          <div className="text-center mt-2">
            <p className="text-xs sm:text-sm text-gray-400">Here is your shortened URL</p>
            <a href={shortenedUrl} target="_blank" className="text-blue-500">
              {shortenedUrl}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ShortenCard
