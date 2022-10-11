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
import { useCallback, useMemo, useState } from 'react';
import { Cat as Cat, PropsWithSteps } from '../../Stepper';
import { StepLayout } from '../StepLayout';
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

  const handleCatOnClick = useCallback(
    (cat?: Cat) => {
      !catsLoading && setSelectedCat(cat);
    },
    [catsLoading]
  );

  return (
    <StepLayout width={{ base: '100%', md: '500px' }}>
      <Box>
        <Box>
          <Heading>Choose a cat</Heading>
        </Box>
        <Box pt={1}>
          <Text>It's your turn to choose a cat, choose wisely.</Text>
          <Text fontSize={'sm'} color={'red.500'} mt={'2'}>
            <b>⚠️ Outage warning:</b> Cat images are currently unavailable due
            to issues with the random cat API. You will be presented with 9
            random pixelated images instead.
          </Text>
        </Box>
      </Box>
      <Box pt={6}>
        <SimpleGrid columns={3} spacing={4}>
          {((cats?.length && cats) || emptyCats).map((cat, i) => (
            <div
              key={`${cat?.image}-${i}`}
              onClick={() => handleCatOnClick(cat)}
            >
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
    </StepLayout>
  );
};
