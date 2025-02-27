'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from '@/context/auth-context';

interface QrcodeCardProps {
  setOpenLoginDialog: (open: boolean) => void;
}

function QrcodeCard({ setOpenLoginDialog }: QrcodeCardProps) {
  const [qrData, setQrData] = useState("");
  const [resultQrCode, setResultQrCode] = useState("");
  const { user } = useAuth();

  const handleDestQr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQrData(e.target.value);
    if (!e.target.value) setResultQrCode("");
  };

  const handleGenerateQRCode = () => {
    if (!qrData) return;
    if (!user) return setOpenLoginDialog(true)
    setResultQrCode(qrData);
  };

  return (
    <Card>
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-2xl font-bold mb-0 pb-0">Generate QR Code</h1>
          <p className="text-xs sm:text-sm text-gray-400">Easy and fast QR code generator</p>
        </div>

        <h2 className="text-md font-semibold">Enter URL destination</h2>
        <Input
          placeholder="https://example.com/my-page"
          value={qrData}
          onChange={handleDestQr}
          className="w-full py-4 sm:py-6 border rounded"
        />
        <Button className="py-4 sm:py-6" onClick={handleGenerateQRCode}>Generate QR Code</Button>

        {resultQrCode && user && (
          <div className="flex items-center flex-col mt-2 gap-6">
            <p className="text-xs sm:text-sm text-gray-400">Here is your QR Code</p>
            <QRCodeSVG value={resultQrCode} size={200} level="H" />
          </div>
        )}

      </CardContent>
    </Card>
  )
}

export default QrcodeCard
