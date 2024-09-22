import { globby } from "globby";
import sharp from "sharp";

const decryptedImages = await globby(
  "./workspaces/server/seeds/decrypted/*.png",
);

for (const decryptedImagePath of decryptedImages) {
  const outputImagePath = decryptedImagePath
    .replace("decrypted", "compressed")
    .replace(".png", ".webp");
  await sharp(decryptedImagePath).webp({ quality: 30 }).toFile(outputImagePath);
}
