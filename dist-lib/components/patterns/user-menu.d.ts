import * as React from "react";
export type UserProfile = {
    name: string;
    email: string;
    /** Display role, e.g. "Ops". */
    role: string;
};
type UserMenuProps = {
    user: UserProfile;
    /** Called when the user picks "ออกจากระบบ". May be async; the item shows its busy state meanwhile. */
    onLogout: () => void | Promise<void>;
};
/**
 * Sidebar footer user row: a round avatar and the name on one line. Tapping it opens a dropdown to the side
 * with the email, role and sign out. Collapses to the avatar in icon mode.
 */
declare function UserMenu({ user, onLogout }: UserMenuProps): React.JSX.Element;
export { UserMenu };
