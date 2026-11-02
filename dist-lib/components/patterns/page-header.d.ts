import * as React from "react";
type PageHeaderProps = {
    title: React.ReactNode;
    description?: React.ReactNode;
    /** Badges next to the title (e.g. status). */
    meta?: React.ReactNode;
    /** One primary action at most; others secondary or outline. */
    actions?: React.ReactNode;
    className?: string;
};
declare function PageHeader({ title, description, meta, actions, className }: PageHeaderProps): React.JSX.Element;
export { PageHeader };
