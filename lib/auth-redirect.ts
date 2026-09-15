/**
 * Pure invite-only auth gate. Returns a path to redirect to, or null to stay.
 */
export function resolveAuthRedirect(opts: {
  pathname: string;
  isAuthenticated: boolean;
  mustChangePassword: boolean;
}): string | null {
  const { pathname, isAuthenticated, mustChangePassword } = opts;
  const isLogin = pathname === "/login";
  const isChangePassword = pathname === "/change-password";

  if (!isAuthenticated) {
    return isLogin ? null : "/login";
  }

  if (mustChangePassword) {
    return isChangePassword ? null : "/change-password";
  }

  if (isLogin || isChangePassword) {
    return "/";
  }

  return null;
}
