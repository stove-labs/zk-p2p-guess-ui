import { Button } from '@chakra-ui/button';
import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { useMemo, useState } from 'react';
import { Cat as Cat, PropsWithSteps } from '../../Stepper';
import { CatImage } from './CatImage';

export type ChooseCatProps = {
  onCatConfirmed: (cat: Cat) => void;
  cats?: Cat[];
  catsLoading: boolean;
};

export const ChooseCat: React.FC<ChooseCatProps> = ({
  cats,
  catsLoading,
  onCatConfirmed,
}) => {
  const emptyCats: (Cat | undefined)[] = useMemo(
    () => Array.from(Array(9)),
    []
  );

  const [selectedCat, setSelectedCat] = useState<Cat>();
  const disabled = useMemo(() => !selectedCat, [selectedCat]);

  return (
    <Center>
      <Box pt={6} width={'500px'}>
        <Box>
          <Box>
            <Heading>Choose a cat</Heading>
          </Box>
          <Box pt={1}>
            <Text>It's your turn to choose a cat, choose wisely.</Text>
          </Box>
        </Box>
        <Box pt={6}>
          <SimpleGrid columns={3} spacing={4}>
            {(cats || emptyCats).map((cat) => (
              <div onClick={() => setSelectedCat(cat)}>
                <CatImage
                  selected={cat?.id === selectedCat?.id}
                  loading={catsLoading}
                  image={cat?.image}
                />
              </div>
            ))}
          </SimpleGrid>
        </Box>
        <Box pt={6}>
          <Center>
            <Button
              disabled={disabled}
              onClick={() => selectedCat && onCatConfirmed(selectedCat)}
            >
              {disabled ? 'Please select a cat' : 'Confirm cat selection'}
            </Button>
          </Center>
        </Box>
      </Box>
    </Center>
  );
};
