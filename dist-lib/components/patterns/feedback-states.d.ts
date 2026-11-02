import * as React from "react";
type EmptyStateProps = {
    /**
     * no-data: nothing exists yet (offer the create action).
     * no-results: data exists but filters hide it (offer "clear filters").
     */
    kind: "no-data" | "no-results";
    title?: string;
    description?: string;
    action?: React.ReactNode;
};
declare function EmptyState({ kind, title, description, action }: EmptyStateProps): React.JSX.Element;
type ErrorStateProps = {
    title?: string;
    description?: string;
    /** Shown to support staff; e.g. a request id. Never show stack traces. */
    reference?: string;
    onRetry?: () => void;
    retrying?: boolean;
};
declare function ErrorState({ title, description, reference, onRetry, retrying }: ErrorStateProps): React.JSX.Element;
export { EmptyState, ErrorState };
