import * as React from "react";
type BadgeOverflowProps = {
    /** Badges to show, in priority order. */
    items: React.ReactNode[];
    /** How many badges stay visible before the rest collapse into "…". */
    max?: number;
    /** Heading inside the hover card. */
    label?: string;
};
/**
 * Keeps table cells one line tall (badges never wrap, so every row has the same height): shows the first `max` badges and collapses the rest into a "…" badge.
 * Hovering or focusing "…" lists every badge. The full list is also exposed to screen readers
 * through the trigger's accessible name, so nothing is hidden from them.
 */
declare function BadgeOverflow({ items, max, label, }: BadgeOverflowProps): React.JSX.Element;
export { BadgeOverflow };
