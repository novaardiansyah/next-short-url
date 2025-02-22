"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import FreePlan from "./FreePlan";

export default function ShortenAndQRCodeTabs() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [qrData, setQrData] = useState("");
  const [resultQrCode, setResultQrCode] = useState("");
  const [activeTab, setActiveTab] = useState("shorten");

  const handleShorten = () => {
    if (!url) return;
    const fakeShortUrl = `https://nova.sh/${btoa(url).slice(0, 6)}`;
    setShortenedUrl(fakeShortUrl);
  };

  const handleDestQr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQrData(e.target.value);
    if (!e.target.value) setResultQrCode("");
  };

  const handleGenerateQRCode = () => {
    if (!qrData) return;
    setResultQrCode(qrData);
  };

  return (
    <>
      <Card className="w-full max-w-[90%] sm:w-[60%] mx-auto mt-[-5rem] mb-8 pt-12 pb-6 shadow-md relative z-11">
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="shorten" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14 px-2 sm:px-3">
              <TabsTrigger value="shorten" className="py-2 sm:py-3">Shorten URL</TabsTrigger>
              <TabsTrigger value="qrcode" className="py-2 sm:py-3">Generate QR Code</TabsTrigger>
            </TabsList>

            {/* Shorten URL */}
            <TabsContent value="shorten">
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
                  {shortenedUrl && (
                    <div className="text-center mt-2">
                      <p className="text-xs sm:text-sm text-gray-400">Here is your shortened URL</p>
                      <a href={shortenedUrl} target="_blank" className="text-blue-500">
                        {shortenedUrl}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Generate QR Code */}
            <TabsContent value="qrcode">
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

                  {resultQrCode && (
                    <div className="flex items-center flex-col mt-2 gap-6">
                      <p className="text-xs sm:text-sm text-gray-400">Here is your QR Code</p>
                      <QRCodeSVG value={resultQrCode} size={200} level="H" />
                    </div>
                  )}

                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-5 mb-10 text-center">
        <h1 className="mb-2 text-xl sm:text-2xl font-bold">Sign Up for Free, Get Started Now!</h1>
        <p className="text-sm">No credit card required, expand your free plans benefit</p>

        <FreePlan activeTab={activeTab} />
      </div>
    </>
  );
}