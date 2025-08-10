import CryptoJS from "crypto-js";

export const generateEncryption = (value: string): string => {
  const encrypted = CryptoJS.AES.encrypt(
    value,
    import.meta.env.VITE_SECRET_KEY
  );

  return encrypted.toString();
};

export const generateDecryption = (value: string): string => {
  const decrypted = CryptoJS.AES.decrypt(
    value,
    import.meta.env.VITE_SECRET_KEY
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
};
