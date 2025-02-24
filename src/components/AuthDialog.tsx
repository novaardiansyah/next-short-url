"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { AlertDestructive } from "./ui/alert/AlertDestructive";

interface AuthDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export default function AuthDialog({ open, setOpen, isLogin, setIsLogin }: AuthDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleChangeAuthMode = (isLogin: boolean) => {
    formRef.current?.reset();
    setAlertMsg('');
    setIsLogin(isLogin);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlertMsg('');
    
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const userData = Object.fromEntries(formData.entries());

    isLogin ? handleLogin(userData) : handleSignUp(userData);

    return true
  };

  const handleLogin = async (userData: any) => {
    console.log('Handle Login:', userData);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({ action: 'login', ...userData }),
      });

      const data = await res.json();

      if (res.ok) {
        return localStorage.setItem('access_token', data.access_token);
      }

      return setAlertMsg('Please check your email or password, and try again.');
    } catch (err) {
      console.error('Error during login:', err);
    }
  }

  const handleSignUp = async (userData: any) => {
    console.log('Handle Sign Up:', userData);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold tracking-tight text-2xl">{isLogin ? "Login to Your Account" : "Create an Account"}</DialogTitle>
          <p className="text-sm text-muted-foreground">{isLogin ? 'Welcome back! Please log in to your account' : 'Enter your email below to create your account'}</p>
        </DialogHeader>
        <form className="space-y-4" ref={formRef} onSubmit={handleSubmit}>
          {alertMsg && <AlertDestructive title="Error!" description={alertMsg} />}

          <div className="input-group">
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" type="email" placeholder="Email Address" required />
          </div>
          <div className="input-group">
            <Label htmlFor="password">Password</Label>
            <div className="flex w-full items-center space-x-2">
              <Input name="password" id="password" type={showPassword ? 'text' : 'password'} placeholder="Password" required />
              <Button type="button" variant="outline" size="icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full">{isLogin ? "Login" : "Create account"}</Button>
        </form>
        <p className="text-sm text-center mt-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="submit"
            onClick={() => handleChangeAuthMode(!isLogin)}
            className="hover:underline"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
