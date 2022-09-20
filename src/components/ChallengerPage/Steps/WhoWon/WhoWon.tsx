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
import { useCallback, useMemo } from 'react';
import { CatImage } from '../ChooseCat/CatImage';
import { StepLayout } from '../StepLayout';
import { useStopwatch } from 'react-timer-hook';
import { useCopyToClipboard } from 'usehooks-ts';
import { Cat } from '../../Stepper';
import { StackedCatImage } from '../ChooseCat/StackedCatImage';
import { TimeElapsed } from '../../../TimeElapsed';

export type WhoWonProps = {
  selectedCat: Cat;
  status: 'YOU_WON' | 'THEY_WON';
  type: 'CHALLENGER' | 'SOLVER';
};

export const WhoWon: React.FC<WhoWonProps> = ({
  selectedCat,
  status,
  type,
}) => {
  const headingText = useMemo(() => {
    switch (status) {
      case 'YOU_WON':
        return 'Congratulations, you won!';
      case 'THEY_WON':
        return 'Oh no, you did not win!';
    }
  }, [status]);

  const descriptionText = useMemo(() => {
    switch (status) {
      case 'YOU_WON':
        switch (type) {
          case 'CHALLENGER':
            return 'Your friend did not guess correctly, you won!';
          case 'SOLVER':
            return 'You have guessed the cat correctly, you won!';
        }
      case 'THEY_WON':
        switch (type) {
          case 'CHALLENGER':
            return 'Your friend did guess correctly, you loose!';
          case 'SOLVER':
            return 'You did not guess the cat correctly, you loose!';
        }
    }
  }, [status]);

  return (
    <StepLayout width={{ base: '100%', md: '500px' }}>
      <Box>
        <Box>
          <Heading>{headingText}</Heading>
        </Box>
        <Box pt={1}>
          <Text>{descriptionText}</Text>
        </Box>
      </Box>
      <Box pt={8}>
        <Center flexDirection={'row'} justifyContent={'space-between'}>
          <Box width={'200px'}>
            <StackedCatImage
              firstImage={selectedCat.image}
              guessStatus={
                type === 'CHALLENGER'
                  ? status === 'YOU_WON'
                    ? 'WRONG'
                    : 'CORRECT'
                  : status === 'YOU_WON'
                  ? 'CORRECT'
                  : 'WRONG'
              }
            />
          </Box>
          <Center
            flexDirection={'column'}
            justifyContent={'space-between'}
            alignItems={'start'}
            height={'100%'}
            flex={1}
            pl={20}
          >
            <Box>
              <Heading size={'md'}>What's next?</Heading>
              <Text pt={2} fontSize={'sm'}>
                Please let us know how you've enjoyed the game, the best place
                to do that is on{' '}
                <Link
                  textDecoration={'underline'}
                  href="https://twitter.com/stove_labs"
                  target="_blank"
                >
                  twitter
                </Link>
                .
              </Text>
            </Box>
            <Box pt={6} width={'100%'}>
              <Button rightIcon={<ChevronRightIcon />} width={'100%'}>
                <a href="/">Back to home page</a>
              </Button>
            </Box>
          </Center>
        </Center>
      </Box>
      <Center pt={4} flexDirection={'column'}></Center>
    </StepLayout>
  );
};
