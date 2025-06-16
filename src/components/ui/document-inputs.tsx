import React from "react";
import { PatternFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CpfInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
}

export const CpfInput = React.forwardRef<HTMLInputElement, CpfInputProps>(
  ({ value, onChange, onBlur, placeholder, className, ...props }, ref) => {
    return (
      <PatternFormat
        format="###.###.###-##"
        mask="_"
        value={value}
        onValueChange={(values) => {
          onChange?.(values.value);
        }}
        onBlur={onBlur}
        customInput={Input}
        placeholder={placeholder || "000.000.000-00"}
        className={cn(className)}
        {...props}
        getInputRef={ref}
      />
    );
  }
);

CpfInput.displayName = "CpfInput";

interface CnpjInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
}

export const CnpjInput = React.forwardRef<HTMLInputElement, CnpjInputProps>(
  ({ value, onChange, onBlur, placeholder, className, ...props }, ref) => {
    return (
      <PatternFormat
        format="##.###.###/####-##"
        mask="_"
        value={value}
        onValueChange={(values) => {
          onChange?.(values.value);
        }}
        onBlur={onBlur}
        customInput={Input}
        placeholder={placeholder || "00.000.000/0000-00"}
        className={cn(className)}
        {...props}
        getInputRef={ref}
      />
    );
  }
);

CnpjInput.displayName = "CnpjInput";
