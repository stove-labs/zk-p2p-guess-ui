import {
  CheckCircleIcon,
  CheckIcon,
  ChevronRightIcon,
  CopyIcon,
} from '@chakra-ui/icons';
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
import { useCallback, useEffect, useMemo } from 'react';
import { StepLayout } from '../StepLayout';
import { Cat } from '../../Stepper';
import { StackedCatImage } from '../ChooseCat/StackedCatImage';
import { TimeElapsed } from '../../../TimeElapsed';
import { useCountdown } from 'usehooks-ts';

export type AwaitGuessProps = {
  selectedCat: Cat;
  status:
    | 'AWAITING_GUESS'
    | 'AWAITING_PROOF'
    | 'VALIDATING_PROOF'
    | 'RESULTS_READY';
  onShowResults: () => void;
};

export const AwaitGuess: React.FC<AwaitGuessProps> = ({
  selectedCat,
  status,
  onShowResults,
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

  const [count, { startCountdown }] = useCountdown({
    countStart: 5,
  });

  useEffect(() => {
    status === 'RESULTS_READY' && startCountdown();
  }, [startCountdown, status]);

  const handleShowResults = useCallback(() => {
    onShowResults();
  }, [onShowResults]);

  useEffect(() => {
    if (count === 0 && status === 'RESULTS_READY') {
      handleShowResults();
    }
  }, [count, handleShowResults, status]);

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
              <TimeElapsed paused={status === 'RESULTS_READY'} />
            </Center>
            <Box pt={5}>
              <Button
                isLoading={status !== 'RESULTS_READY'}
                loadingText={loadingText}
                width={'100%'}
                minWidth={'220px'}
                onClick={handleShowResults}
                rightIcon={<ChevronRightIcon />}
                p={3}
              >
                Show results
              </Button>
              {status === 'RESULTS_READY' ? (
                <Center textAlign={'center'}>
                  <Text pt={1.5} color={'gray.500'} fontSize={'xs'}>
                    Showing results automatically <br /> in {count} seconds
                  </Text>
                </Center>
              ) : (
                <></>
              )}
            </Box>
          </Center>
        </Center>
      </Box>
      <Center pt={4} flexDirection={'column'}></Center>
    </StepLayout>
  );
};
