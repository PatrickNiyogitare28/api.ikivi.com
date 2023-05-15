import { verify, hash } from 'argon2';

export const hashPassword = (password: string) => {
  return hash(password);
};

export const verifyPassword = async (
  hashedPassword: string,
  password: string,
) => {
  try {
    const is_verified = await verify(hashedPassword, password);
    return is_verified;
  } catch (e) {
    return false;
  }
};
