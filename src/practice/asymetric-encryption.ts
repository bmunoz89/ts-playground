// https://dev.to/superviz/implementing-symmetric-and-asymmetric-encryption-with-nodejs-4efp

import crypto, { type KeyPairSyncResult } from "crypto";

function generateKeyPair(
  passphrase: string
): KeyPairSyncResult<string, string> {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: passphrase,
    },
  });

  return {
    publicKey,
    privateKey,
  };
}

const encrypt = (text: string, publicKey: string): string => {
  return crypto
    .publicEncrypt(publicKey, Buffer.from(text, "utf8"))
    .toString("base64");
};

const decrypt = (
  encryptedText: string,
  privateKey: string,
  passphrase: string
) => {
  return crypto
    .privateDecrypt(
      {
        key: privateKey,
        passphrase,
      },
      Buffer.from(encryptedText, "base64")
    )
    .toString("utf8");
};

const message = "Este es un mensaje secreto 🔐";
const passphrase = "password";

const { publicKey, privateKey } = generateKeyPair(passphrase);

const encryptedData = encrypt(message, publicKey);
console.log("Mensaje cifrado:", encryptedData);

const decryptedData = decrypt(encryptedData, privateKey, passphrase);
console.log("Mensaje descifrado:", decryptedData);
