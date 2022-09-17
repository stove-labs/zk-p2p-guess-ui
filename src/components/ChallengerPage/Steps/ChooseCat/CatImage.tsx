import { AspectRatio } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import styled from '@emotion/styled';

export type CatProps = {
  loading?: boolean;
  image?: string;
  selected?: boolean;
};

const SelectableImg = styled.img<{ selected?: boolean }>`
  border: 6px solid;
  border-color: transparent;
  transition: all 140ms ease-in-out;
  border-radius: 12px;
  transform: scale(1);
  cursor: pointer;

  &:hover {
    border-color: var(--chakra-colors-gray-300);
  }

  ${(props) =>
    props.selected &&
    `
    border-color: var(--chakra-colors-teal-500);
    &:hover {
      border-color: var(--chakra-colors-teal-500);
    }
  `}
`;

export const CatImage: React.FC<CatProps> = ({ loading, image, selected }) => (
  <AspectRatio ratio={1} width={'100%'}>
    <Skeleton isLoaded={!loading}>
      <SelectableImg
        selected={selected}
        src={`data:image/png;base64,${image}`}
      />
    </Skeleton>
  </AspectRatio>
);
