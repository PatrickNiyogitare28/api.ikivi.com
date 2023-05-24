/**
 * @description Generates a random 6-digit otp code
 * @returns {number} otp code
 */
const generateOTP = async () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};

const generateSlug = (name: string) => {
  const randomNumber = Math.floor(Math.random() * 10000);
  return `${name
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}\s]/g, '-')}${randomNumber}`;
};

const generateRandomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Define the possible characters
  let code = '';
  for (let i = 0; i < 6; i++) {
    // Generate 6 random characters
    const index = Math.floor(Math.random() * characters.length);
    code += characters.charAt(index);
  }
  return code;
};
export { generateOTP, generateSlug, generateRandomCode };
