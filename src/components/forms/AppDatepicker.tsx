import React from "react";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

interface AppDatepickerProps {
  name: string;
  label: string;
  tooltip?: string;
  className?: string;
  rules?: Record<string, unknown>;
  showTime?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export const AppDatepicker = ({
  name,
  label,
  tooltip,
  className,
  rules,
  showTime = false,
  minDate,
  maxDate,
}: AppDatepickerProps) => {
  const form = useFormContext();
  const [selectedTime, setSelectedTime] = React.useState("00:00");

  const combineDateAndTime = (date: Date, timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const newDate = new Date(date);
    newDate.setHours(parseInt(hours), parseInt(minutes));
    return newDate;
  };

  const isDateSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: {
      onChange: (value: Date) => void;
      value: Date;
    }
  ) => {
    setSelectedTime(e.target.value);
    if (field.value) {
      const newDate = combineDateAndTime(field.value, e.target.value);
      field.onChange(newDate);
      form.trigger(name);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      rules={{
        ...rules,
        validate: {
          minDateTime: (value: Date) => {
            if (minDate) {
              // Si es el mismo día, validar la hora
              if (isDateSameDay(value, minDate)) {
                return (
                  value.getTime() >= minDate.getTime() ||
                  `La hora debe ser posterior a las ${minDate
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${minDate
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`
                );
              }
              // Si es otro día, validar la fecha completa
              return (
                value >= minDate ||
                "La fecha seleccionada debe ser posterior a la fecha mínima permitida"
              );
            }
            return true;
          },
          maxDate: (value: Date) => {
            if (maxDate) {
              return (
                value <= maxDate ||
                "La fecha seleccionada excede el límite permitido"
              );
            }
            return true;
          },
        },
      }}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", className)}>
          <div className="flex items-center gap-2">
            <FormLabel className="text-base">{label}</FormLabel>

            {tooltip && (
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger type="button" className="hover:cursor-help">
                    <Info className="h-4 w-4 text-muted-foreground hover:text-gray-900 transition-colors" />
                  </TooltipTrigger>

                  <TooltipContent
                    sideOffset={5}
                    className="bg-gray-800 text-white px-3 py-1.5 rounded shadow-lg"
                  >
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP", { locale: es })
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    if (date) {
                      const newDate = showTime
                        ? combineDateAndTime(date, selectedTime)
                        : date;
                      field.onChange(newDate);
                      form.trigger(name);
                    }
                  }}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    date.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>

            {showTime && (
              <FormControl>
                <Input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => handleTimeChange(e, field)}
                  className="w-32"
                />
              </FormControl>
            )}
          </div>

          <FormMessage className="text-sm font-medium text-red-500" />
        </FormItem>
      )}
    />
  );
};
