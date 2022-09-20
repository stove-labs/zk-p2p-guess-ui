import { AspectRatio } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import styled from '@emotion/styled';

export type CatProps = {
  loading?: boolean;
  image?: string;
  selected?: boolean;
};

const SelectableImg = styled.div<{
  selected?: boolean;
  backgroundUrl?: string;
}>`
  border: 6px solid;
  border-color: white;
  transition: all 140ms ease-in-out;
  border-radius: 12px;
  transform: scale(1);
  cursor: pointer;
  -webkit-user-drag: none;
  ${(props) => `
    background: url(${props.backgroundUrl});
  `}

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  width: 100%;
  height: 100%;

  &:hover {
    border-color: var(--chakra-colors-gray-300);
  }

  ${(props) =>
    props.selected &&
    `
    border-color: var(--chakra-colors-green-500);
    &:hover {
      border-color: var(--chakra-colors-green-500);
    }
  `}
`;

export const CatImage: React.FC<CatProps> = ({ loading, image, selected }) => (
  <AspectRatio ratio={1} width={'100%'}>
    <Skeleton isLoaded={!loading}>
      <SelectableImg selected={selected} backgroundUrl={image} />
    </Skeleton>
  </AspectRatio>
);
