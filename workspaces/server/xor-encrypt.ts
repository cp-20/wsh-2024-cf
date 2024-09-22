import fs from "node:fs/promises";

const encryptKey = "wsh-2024-encrypt-key";
const encrypt = (buffer: Buffer) => {
  const encrypted = Buffer.alloc(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    encrypted[i] = buffer[i]! ^ encryptKey.charCodeAt(0);
  }
  return encrypted;
};

import { globby } from "globby";

const decryptedImages = await globby(
  "./workspaces/server/seeds/compressed/*.webp",
);

for (const decryptedImagePath of decryptedImages) {
  const blob = await fs.readFile(decryptedImagePath);
  const encrypted = encrypt(blob);
  await fs.writeFile(
    decryptedImagePath.replace("compressed", "images"),
    encrypted,
  );
}
