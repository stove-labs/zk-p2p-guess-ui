import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Heading, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo } from 'react';
import { start } from 'repl';
import { useCountdown } from 'usehooks-ts';
import { Cat } from '../../ChallengerPage/Stepper';
import { StackedCatImage } from '../../ChallengerPage/Steps/ChooseCat/StackedCatImage';
import { StepLayout } from '../../ChallengerPage/Steps/StepLayout';
import { TimeElapsed } from '../../TimeElapsed';

export type SubmitGuessProps = {
  selectedCat: Cat;
  status: 'GENERATING_PROOF' | 'RESULTS_READY';
  onShowResults: () => void;
};

export const SubmitGuess: React.FC<SubmitGuessProps> = ({
  selectedCat,
  status,
  onShowResults,
}) => {
  const [count, { startCountdown }] = useCountdown({
    countStart: 5,
  });

  useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  const handleShowResults = useCallback(() => {
    onShowResults();
  }, [onShowResults]);

  useEffect(() => {
    if (count === 0) handleShowResults();
  }, [count, handleShowResults]);

  return (
    <StepLayout width={{ base: '100%', md: '500px' }}>
      <Box>
        <Box>
          <Heading>Submit your guess</Heading>
        </Box>
        <Box pt={1}>
          <Text>
            You've selected a cat, now it's time to find out if your guess was
            correct. Please wait until the results are ready.
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
                isLoading={status === 'GENERATING_PROOF'}
                loadingText={'Proving your guess...'}
                width={'100%'}
                minWidth={'220px'}
                p={3}
                rightIcon={<ChevronRightIcon />}
                onClick={handleShowResults}
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
