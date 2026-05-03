import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"
import { cn } from "../lib/cn"

const lovarchAlertVariants = cva(
  "relative flex items-start gap-3 rounded-lg border p-3 text-sm",
  {
    variants: {
      variant: {
        info: "bg-muted/30 border-muted-foreground/20 text-foreground dark:bg-muted/20 dark:border-muted-foreground/15",
        warning: "bg-muted/40 border-muted-foreground/25 text-foreground dark:bg-muted/25 dark:border-muted-foreground/20",
        success: "bg-muted/30 border-muted-foreground/20 text-foreground dark:bg-muted/20 dark:border-muted-foreground/15",
        error: "bg-destructive/5 border-destructive/20 text-foreground dark:bg-destructive/10 dark:border-destructive/25",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const iconVariants = {
  info: "text-muted-foreground",
  warning: "text-muted-foreground",
  success: "text-muted-foreground",
  error: "text-destructive/70",
}

const IconMap = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: XCircle,
}

export interface LovarchAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof lovarchAlertVariants> {
  icon?: React.ReactNode
  hideIcon?: boolean
}

const LovarchAlert = React.forwardRef<HTMLDivElement, LovarchAlertProps>(
  ({ className, variant = "info", icon, hideIcon = false, children, ...props }, ref) => {
    const IconComponent = IconMap[variant || "info"]
    const iconClass = iconVariants[variant || "info"]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(lovarchAlertVariants({ variant }), className)}
        {...props}
      >
        {!hideIcon && (
          <span className={cn("mt-0.5 shrink-0", iconClass)}>
            {icon || <IconComponent className="h-4 w-4" />}
          </span>
        )}
        <div className="flex-1">{children}</div>
      </div>
    )
  }
)
LovarchAlert.displayName = "LovarchAlert"

export { LovarchAlert, lovarchAlertVariants }
