import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props} className={`${
            variant === "destructive" 
              ? "border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-300" 
              : "border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-300"
          } flex items-center gap-3`}>
            <div className="flex-shrink-0">
              {variant === "destructive" ? (
                <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
              )}
            </div>
            <div className="grid gap-1">
              {title && <ToastTitle className="text-base font-semibold">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-sm opacity-90">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100" />
          </Toast>
        )
      })}
      <ToastViewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </ToastProvider>
  )
}