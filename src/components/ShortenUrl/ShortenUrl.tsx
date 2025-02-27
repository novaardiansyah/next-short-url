"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

import FreePlan from "../FreePlan";
import ShortenCard from "./ShortenCard";
import QrcodeCard from "./QrcodeCard";
import AuthDialog from "../AuthDialog";

export default function ShortenAndQRCodeTabs() {
  const [activeTab, setActiveTab] = useState("shorten");

  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <AuthDialog open={open} setOpen={setOpen} isLogin={isLogin} setIsLogin={setIsLogin} />

      <Card className="w-full max-w-[90%] sm:w-[60%] mx-auto mt-[-3.5rem] mb-8 pt-12 pb-6 shadow-md relative z-11">
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="shorten" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14 px-2 sm:px-3">
              <TabsTrigger value="shorten" className="py-2 sm:py-3">Shorten URL</TabsTrigger>
              <TabsTrigger value="qrcode" className="py-2 sm:py-3">Generate QR Code</TabsTrigger>
            </TabsList>

            {/* Shorten URL */}
            <TabsContent value="shorten">
              <ShortenCard setOpenLoginDialog={setOpen} />
            </TabsContent>

            {/* Generate QR Code */}
            <TabsContent value="qrcode">
              <QrcodeCard setOpenLoginDialog={setOpen} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-10 text-center px-6 sm:px-0">
        <h1 className="mb-2 text-xl sm:text-2xl font-bold">Sign Up for Free, <br className="block sm:hidden" />Get Started Now!</h1>
        <p className="text-sm">No credit card required, <br className="block sm:hidden" />expand your free plans benefit</p>

        <FreePlan activeTab={activeTab} />
      </div>
    </>
  );
}