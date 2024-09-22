import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { getImageUrl } from '../../../lib/image/getImageUrl';

const decryptKey = 'wsh-2024-encrypt-key';
const decrypt = (buffer: Uint8Array): Uint8Array => {
  const encrypted = new Uint8Array(buffer.byteLength);
  for (let i = 0; i < buffer.byteLength; i++) {
    encrypted[i] = buffer[i]! ^ decryptKey.charCodeAt(0);
  }
  return encrypted;
};

const _Image = styled.img`
  height: 100%;
  width: auto;
  flex-grow: 0;
  flex-shrink: 0;
  pointer-events: none;
  user-select: none;
`;

type Props = {
  pageImageId: string;
};

export const ComicViewerPage = ({ pageImageId }: Props) => {
  const ref = useRef<HTMLImageElement>(null);
  const url = getImageUrl({
    format: 'webp',
    imageId: pageImageId,
  });

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      const decrypted = decrypt(new Uint8Array(buffer));
      const blob = new Blob([decrypted], { type: 'image/webp' });
      const imageUrl = URL.createObjectURL(blob);
      ref.current!.src = imageUrl;
    };

    fetchImage();
  }, [url]);

  return <_Image ref={ref} />;
};
