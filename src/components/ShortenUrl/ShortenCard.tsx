'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/context/auth-context';

interface ShortenCardProps {
  setOpenLoginDialog: (open: boolean) => void;
}
function ShortenCard({ setOpenLoginDialog }: ShortenCardProps) {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const { user } = useAuth();

  const handleShorten = (): void => {
    if (!url) return;
    if (!user) return setOpenLoginDialog(true)
    
    const fakeShortUrl = `${process.env.NEXT_PUBLIC_SHORT_DOMAIN}/${btoa(url).slice(0, 6)}`;
    setShortenedUrl(fakeShortUrl);
  };

  return (
    <Card>
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="mb-6 sm:mb-10">
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

        <Button className="py-4 sm:py-6" onClick={handleShorten}>Get Shortened URL</Button>
        
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
