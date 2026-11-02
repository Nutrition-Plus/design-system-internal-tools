import * as React from "react";
declare function Card({ className, size, variant, interactive, ...props }: React.ComponentProps<"div"> & {
    /** Tappable card: shows a hover fill and pointer. */
    interactive?: boolean;
    size?: "default" | "sm";
    /** muted = Secondary background for grouping information */
    variant?: "default" | "muted";
}): React.JSX.Element;
declare function CardHeader({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function CardTitle({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function CardDescription({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function CardAction({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function CardContent({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function CardFooter({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, };
