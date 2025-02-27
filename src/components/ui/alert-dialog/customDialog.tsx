import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ButtonLoading } from '../button/ButtonLoading';

interface ConfirmDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleConfirm: () => void;
  description?: string;
  isLoading?: boolean;
}

function ConfirmDialog({ open, setOpen, handleConfirm, description, isLoading }: ConfirmDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(!open)}>Cancel</AlertDialogCancel>
          { isLoading ? <ButtonLoading /> : (
              <AlertDialogAction onClick={handleConfirm}>
                Yes, I&apos;m sure
              </AlertDialogAction>
            )
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDialog
