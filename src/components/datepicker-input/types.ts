export interface DatepickerInputProps {
  name: string;
  label: string;
  tooltip?: string;
  className?: string;
  rules?: Record<string, unknown>;
  showTime?: boolean;
  minDate?: Date;
  maxDate?: Date;
}
