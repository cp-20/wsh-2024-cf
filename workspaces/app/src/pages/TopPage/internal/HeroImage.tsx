import styled from 'styled-components';

const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: contain;
`;

const _Picture = styled.picture`
  width: 100%;
`;

const _Image = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: fill;
`;

export const HeroImage: React.FC = () => {
  return (
    <_Wrapper>
      <_Picture>
        <source media="(min-width: 1600px)" srcSet="/assets/hero-image-1920.webp" />
        <source media="(min-width: 1280px)" srcSet="/assets/hero-image-1600.webp" />
        <source media="(min-width: 960px)" srcSet="/assets/hero-image-1280.webp" />
        <source media="(min-width: 640px)" srcSet="/assets/hero-image-960.webp" />
        <source media="(min-width: 320px)" srcSet="/assets/hero-image-640.webp" />
        <_Image loading="eager" src="/assets/hero-image-320.webp" />
      </_Picture>
    </_Wrapper>
  );
};
