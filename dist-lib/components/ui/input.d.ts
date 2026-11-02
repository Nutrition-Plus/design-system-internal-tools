import * as React from "react";
declare function Input({ className, type, size, ...props }: Omit<React.ComponentProps<"input">, "size"> & {
    size?: "sm" | "default";
}): React.JSX.Element;
export { Input };
