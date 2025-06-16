import React from "react";
import { PatternFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, onBlur, placeholder, className, ...props }, ref) => {
    return (
      <PatternFormat
        format="(##) #####-####"
        mask="_"
        value={value}
        onValueChange={(values) => {
          onChange?.(values.value);
        }}
        onBlur={onBlur}
        customInput={Input}
        placeholder={placeholder || "(11) 99999-9999"}
        className={cn(className)}
        {...props}
        getInputRef={ref}
      />
    );
  }
);

PhoneInput.displayName = "PhoneInput";
