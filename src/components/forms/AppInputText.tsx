import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface AppInputTextProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "url";
  tooltip?: string;
  className?: string;
  rules?: Record<string, unknown>;
  onValueChange?: (value: string | number) => void;
}

export const AppInputText = ({
  name,
  label,
  placeholder,
  type = "text",
  tooltip,
  className,
  rules,
  onValueChange,
}: AppInputTextProps) => {
  const form = useFormContext();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: unknown[]) => void
  ) => {
    const value =
      type === "number"
        ? e.target.value === ""
          ? ""
          : parseInt(e.target.value)
        : e.target.value;
    onChange(value);
    onValueChange?.(value as string | number);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className={className}>
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

          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              className="focus-visible:ring-1"
              {...field}
              value={field.value || ""}
              onChange={(e) => handleChange(e, field.onChange)}
              onBlur={field.onBlur}
            />
          </FormControl>

          <FormMessage className="text-sm font-medium text-red-500" />
        </FormItem>
      )}
    />
  );
};
