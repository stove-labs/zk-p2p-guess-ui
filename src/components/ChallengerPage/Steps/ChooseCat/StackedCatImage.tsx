import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Cat } from '../../Stepper';
import { CatImage } from './CatImage';

export type GuessCatImageProps = {
  status: 'UNKNOWN' | 'CORRECT' | 'WRONG';
};

export type StackedCatImageProps = {
  firstImage: Cat['image'];
  guessStatus: GuessCatImageProps['status'];
};

export const GuessCatImage = styled.div<GuessCatImageProps>`
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
  border-radius: 12px;
  /* background: var(--chakra-colors-whiteAlpha-400); */
  background: rgba(45, 55, 72, 0.05);
  border: 6px solid;
  border-color: var(--chakra-colors-gray-100);
  /* border-color: var(--chakra-colors-whiteAlpha-300); */
  /* backdrop-filter: blur(5px); */
  opacity: 1;

  /* box-shadow: 1px 1px 1px var(--chakra-colors-gray-50); */
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);

  ::after {
    content: '?';
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 50px;
    font-weight: 400;
    color: var(--chakra-colors-gray-100);
    position: relative;
    top: -2px;

    ${(props) =>
      props.status === 'CORRECT' &&
      `
      color: var(--chakra-colors-white);
      content: '✅';
      font-size: 40px;
    `}

    ${(props) =>
      props.status === 'WRONG' &&
      `
      color: var(--chakra-colors-white);
      content: '❌';
      font-size: 40px;
    `}
  }
`;

export const StackedCatImage: React.FC<StackedCatImageProps> = ({
  firstImage,
  guessStatus,
}) => {
  return (
    <Box position={'relative'}>
      <CatImage selected={true} image={firstImage} />
      <GuessCatImage status={guessStatus} />
    </Box>
  );
};
