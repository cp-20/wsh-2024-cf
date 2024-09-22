import sharp from "sharp";

const originalHeroImage = "./workspaces/client/assets/hero-image.png";

const sizes = [320, 640, 960, 1280, 1600, 1920];

const generateHeroImage = async () => {
  await Promise.all(
    sizes.map(async (size) => {
      await sharp(originalHeroImage)
        .resize({ width: size })
        .webp({ quality: 30 })
        .toFile(`./workspaces/client/assets/hero-image-${size}.webp`);
    }),
  );
};

await generateHeroImage();
