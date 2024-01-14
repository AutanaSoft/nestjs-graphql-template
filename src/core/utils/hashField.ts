import { compareSync, genSaltSync, hashSync } from 'bcrypt';

/**
 * Hashes a password using bcrypt.
 * @param password - The password to be hashed.
 * @returns The hashed password.
 */
export const hashField = (password: string): string => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

export const verifyHashedField = (field: string, hash: string): boolean => {
  return compareSync(field, hash);
};
