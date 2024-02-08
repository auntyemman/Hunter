/**
 * Checks if the given email is valid.
 *
 * @param email - The email to be validated.
 * @return Returns true if the email is valid, otherwise returns false.
 */

export function isValidEmail(email: string) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}
