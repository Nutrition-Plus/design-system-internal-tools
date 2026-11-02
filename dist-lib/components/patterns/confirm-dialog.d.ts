import * as React from "react";
type ConfirmDialogProps = {
    trigger: React.ReactNode;
    title: string;
    description: React.ReactNode;
    confirmLabel: string;
    cancelLabel?: string;
    /** destructive for actions that delete or cannot be undone. */
    tone?: "default" | "destructive";
    /** May return a promise; the dialog stays open with a spinner until it settles, and stays open on failure. */
    onConfirm: () => void | Promise<void>;
};
/**
 * Use for hard-to-undo actions (cancel booking, delete, mark shipped).
 * Focus starts on Cancel, so pressing Enter by accident is safe.
 */
declare function ConfirmDialog({ trigger, title, description, confirmLabel, cancelLabel, tone, onConfirm, }: ConfirmDialogProps): React.JSX.Element;
export { ConfirmDialog };
