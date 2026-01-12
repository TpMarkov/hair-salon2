import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "../../lib/utils"
import { buttonVariants } from "./button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 items-center justify-center",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center h-10 w-full", // Added h-10 and w-full
        caption_label: "text-sm font-medium whitespace-nowrap",
        nav: "flex items-center justify-between absolute inset-x-0 top-0", // Use absolute inset-x-0 to pin buttons to caption edges
        button_previous: cn(
          "inline-flex items-center justify-center rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-7 w-7 p-0 opacity-50 hover:opacity-100 z-10"
        ),
        button_next: cn(
          "inline-flex items-center justify-center rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-7 w-7 p-0 opacity-50 hover:opacity-100 z-10"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "grid grid-cols-7",
        weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] flex items-center justify-center",
        week: "grid grid-cols-7 w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative focus-within:z-20 flex items-center justify-center",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside: "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) => {
          if (props.orientation === "left") {
            return <ChevronLeft className="h-4 w-4" />
          }
          return <ChevronRight className="h-4 w-4" />
        },
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
