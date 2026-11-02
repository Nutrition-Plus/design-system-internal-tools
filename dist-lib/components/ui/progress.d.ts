import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";
declare const TONES: {
    readonly default: "bg-primary";
    readonly success: "bg-success";
    readonly warning: "bg-warning";
    readonly danger: "bg-danger";
};
declare function Progress({ className, value, tone, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root> & {
    tone?: keyof typeof TONES;
}): React.JSX.Element;
export { Progress };
