"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { CustomAlert } from "./ui/alert/CustomAlert";
import { toast } from "sonner"
import { clientFetch } from "@/lib/clientFetch";

interface AuthDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export default function AuthDialog({ open, setOpen, isLogin, setIsLogin }: AuthDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [alertMsg, setAlertMsg] = useState<{ variant?: "destructive" | "default"; title?: string; description?: string }>({});
  const [invalidField, setInvalidField] = useState<Record<string, string[]>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      formRef.current?.reset();
      setAlertMsg({});
    }
  }, [open]);

  const handleChangeAuthMode = (isLogin: boolean) => {
    formRef.current?.reset();
    setAlertMsg({});
    setIsLogin(isLogin);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlertMsg({});
    setInvalidField({});

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const userData = Object.fromEntries(formData.entries());

    setIsLoading(true)
    isLogin ? handleLogin(userData) : handleSignUp(userData);

    return true;
  };

  const handleLogin = async (userData: any) => {
    let name = userData.email.split('@')[0];
    userData.name = name;

    try {
      const res = await clientFetch('/auth', {
        method: 'POST',
        body: { action: 'login', ...userData }  ,
      })

      const data = await res.json();
      
      if (res.status !== 200) {
        return setAlertMsg({ variant: 'destructive', title: 'Error!', description: 'Your credentials are incorrect, please try again.' });
      }
      
      if (!userData?.hasRegister) {
        setOpen(false)

        toast.success(`Hi ${name}, welcome back!`, {
          duration: 5000,
        })
      }

      localStorage.setItem('access_token', data.access_token)
      handleMe()
    } finally {
      return setIsLoading(false)
    }
  }

  const handleSignUp = async (userData: any) => {
    let name = userData.email.split('@')[0];
    userData.name = name;

    try {
      const res = await clientFetch('/auth', {
        method: 'POST',
        body: { action: 'register', ...userData },
      })
  
      const data = await res.json()
  
      if (res.status === 422) {
        return setInvalidField(data);
      }
  
      if (res.status !== 201) {
        return setAlertMsg({ variant: 'destructive', title: 'Error!', description: 'Something went wrong, please try again.' });
      }
  
      toast.success(`Hi ${name}, we glad to have you here! from now on you can login to your account.`, {
        duration: 5000,
      })

      setOpen(false)
      handleLogin({ hasRegister: true, ...userData })
    } finally {
      return setIsLoading(false)
    }
  }

  const handleMe = async () => {
    try {
      const res = await clientFetch('/auth', {
        method: 'POST',
        body: JSON.stringify({ action: 'me' }),
      })

      const data = await res.json()

      if (res.status === 200) {
        localStorage.setItem('users', JSON.stringify(data));
      }
    } finally {
      return true
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-semibold tracking-tight text-2xl">{isLogin ? "Login to Your Account" : "Create an Account"}</DialogTitle>
          <p className="text-sm text-muted-foreground">{isLogin ? 'Welcome back! Please log in to your account' : 'Enter your email below to create your account'}</p>
        </DialogHeader>
        <form className="space-y-4" ref={formRef} onSubmit={handleSubmit}>
          {alertMsg.variant && <CustomAlert variant={alertMsg.variant} title={alertMsg.title} description={alertMsg.description || ''} />}

          <div className="input-group">
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" type="email" placeholder="email@example.com" required readOnly={isLoading} />
            {invalidField['email'] && <p className="text-[0.8rem] font-medium text-destructive">{invalidField['email'][0]}</p>}
          </div>

          <div className="input-group">
            <Label htmlFor="password">Password</Label>
            <div className="flex w-full items-center space-x-2">
              <Input name="password" id="password" type={showPassword ? 'text' : 'password'} placeholder={showPassword ? '123xxx' : '******'} required readOnly={isLoading} />
              <Button type="button" variant="outline" size="icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
            </div>
            {invalidField['password'] && <p className="text-[0.8rem] font-medium text-destructive">{invalidField['password'][0]}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : isLogin ? "Login" : "Create account"}
          </Button>
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