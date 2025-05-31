export interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'url';
  tooltip?: string;
  className?: string;
  rules?: Record<string, unknown>;
  onValueChange?: (value: string | number) => void;
}
