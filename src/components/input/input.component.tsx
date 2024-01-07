import * as React from "react";

import { COLORS } from "@/src/styles/theme";
import { cn } from "@/src/utils/cn.util";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    labelStyle?: React.CSSProperties;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, labelStyle, ...props }, ref) => {
        const [isFocused, setIsFocused] = React.useState(false);

        const handleFocus = () => {
            setIsFocused(true);
        };

        const handleBlur = () => {
            setIsFocused(false);
        };

        // Define the styles for the input border and label text
        const inputStyle = isFocused ?
            { borderColor: COLORS.LUNNHEIM_OLIVE, outlineColor: COLORS.LUNNHEIM_OLIVE, opacity: "1" } :
            { borderColor: COLORS.LUNNHEIM_DARK_OLIVE, outlineColor: COLORS.LUNNHEIM_DARK_OLIVE, opacity: "0.4 " };


        const labelTextStyle = isFocused ?

            { color: COLORS.LUNNHEIM_DARK_OLIVE } :
            { color: COLORS.LUNNHEIM_OLIVE }


        return (
            <div className="relative mx-auto w-96 max-w-sm">
                <input
                    type={type}
                    id={props.id}
                    className={`placeholder:text-muted-foreground flex h-9 w-full rounded-lg border-2 bg-transparent px-3 py-6 text-sm shadow-sm outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                    ref={ref}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={inputStyle}
                    {...props}
                />
                <label
                    htmlFor={props.id}
                    className={cn("absolute -top-3  left-4 mx-auto  bg-lunnheim-ivory-yellow px-2 font-grotesk  text-sm")}
                    style={{ ...labelTextStyle, ...labelStyle }}
                >
                    {label}
                </label>
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
