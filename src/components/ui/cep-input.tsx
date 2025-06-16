import React from "react";
import { PatternFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CepInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
}

export const CepInput = React.forwardRef<HTMLInputElement, CepInputProps>(
  ({ value, onChange, onBlur, placeholder, className, ...props }, ref) => {
    return (
      <PatternFormat
        format="#####-###"
        mask="_"
        value={value}
        onValueChange={(values) => {
          onChange?.(values.value);
        }}
        onBlur={onBlur}
        customInput={Input}
        placeholder={placeholder || "00000-000"}
        className={cn(className)}
        {...props}
        getInputRef={ref}
      />
    );
  }
);

CepInput.displayName = "CepInput";
