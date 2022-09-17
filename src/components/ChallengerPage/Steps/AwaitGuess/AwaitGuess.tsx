import { CheckCircleIcon, CheckIcon, CopyIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Code,
  Flex,
  Heading,
  Highlight,
  Link,
  Text,
} from '@chakra-ui/layout';
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { CatImage } from '../ChooseCat/CatImage';
import { data } from '../ChooseCat/ChooseCat.stories';
import { StepLayout } from '../StepLayout';
import { useStopwatch } from 'react-timer-hook';
import { useCopyToClipboard } from 'usehooks-ts';
import { Cat } from '../../Stepper';
import { StackedCatImage } from '../ChooseCat/StackedCatImage';
import { TimeElapsed } from '../../../TimeElapsed';

export type AwaitGuessProps = {
  selectedCat: Cat;
  status: 'AWAITING_GUESS' | 'AWAITING_PROOF' | 'VALIDATING_PROOF';
};

export const AwaitGuess: React.FC<AwaitGuessProps> = ({
  selectedCat,
  status,
}) => {
  const loadingText = useMemo(() => {
    switch (status) {
      case 'AWAITING_GUESS':
        return 'Friend is guessing...';
      case 'AWAITING_PROOF':
        return 'Friend is proving...';
      case 'VALIDATING_PROOF':
        return 'Validating proof';
    }
  }, [status]);
  return (
    <StepLayout width={{ base: '100%', md: '500px' }}>
      <Box>
        <Box>
          <Heading>Wait for a guess</Heading>
        </Box>
        <Box pt={1}>
          <Text>
            Your friend is guessing, once they select a cat the game will
            determine if they've guessed correctly.
          </Text>
        </Box>
      </Box>
      <Box pt={12}>
        <Center justifyContent={'space-between'}>
          <Box width={'200px'}>
            <StackedCatImage
              firstImage={selectedCat.image}
              guessStatus="UNKNOWN"
            />
          </Box>
          <Center
            flexDirection={'column'}
            justifyContent={'space-between'}
            height={'100%'}
            flex={1}
            pl={20}
          >
            <Center flexDirection={'column'}>
              <TimeElapsed />
            </Center>
            <Box pt={5}>
              <Button
                isLoading={true}
                loadingText={loadingText}
                width={'100%'}
                minWidth={'220px'}
                p={3}
              ></Button>
            </Box>
          </Center>
        </Center>
      </Box>
      <Center pt={4} flexDirection={'column'}></Center>
    </StepLayout>
  );
};
