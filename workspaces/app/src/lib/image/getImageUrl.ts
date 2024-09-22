type Params = {
  format: "avif" | "webp" | "png" | "jpg" | "jxl";
  height?: number;
  imageId: string;
  width?: number;
};

export function getImageUrl(
  { format, height, imageId, width }: Params,
): string {
  const params = new URLSearchParams();

  params.set("format", format);
  if (width != null) {
    params.set("width", `${width}`);
  }
  if (height != null) {
    params.set("height", `${height}`);
  }

  return `/images/${imageId}?${params.toString()}`;
}
