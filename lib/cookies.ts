export const INTEREST_COOKIE_PREFIX = "bsl_interested_";
export const INTEREST_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function interestCookieName(eventId: string) {
  return `${INTEREST_COOKIE_PREFIX}${eventId}`;
}
