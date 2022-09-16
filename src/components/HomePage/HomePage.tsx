import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { PageLayout } from '../PageLayout/PageLayout';

export const HomePage: React.FC = () => {
  return (
    <PageLayout slightlySmaller>
      <Flex
        height="100%"
        justifyContent="center"
        alignItems="center"
        direction={{ base: 'column', md: 'row' }}
        marginTop={{ base: '-10%' }}
      >
        <Flex
          width={{ base: '100%' }}
          pr={{ base: 0, md: 20 }}
          pb={{ base: 10, md: 0 }}
        >
          <Box>
            <Box>
              <Heading>Guess the cat</Heading>
            </Box>
            <Box pt={1}>
              <Text fontSize={'lg'}>
                Guess the cat is a zero-knowledge, peer-to-peer guessing game
                for cat lovers.
              </Text>
              <Box pt={6}>
                <Heading size={'sm'}>
                  Choose a cat, invite a friend, wait for a guess
                </Heading>
                <Text fontSize={'sm'} pt={1}>
                  The game itself is turn based and requires 2 players. Player 1
                  chooses a cat that they like (or not), Player 2 has to guess
                  which cat has Player 1 chosen. If the guess is correct, Player
                  2 wins.
                </Text>
              </Box>
              <Box pt={6}>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton pl={'0'}>
                      <Heading size={'xs'}>
                        What happens under the hood?
                      </Heading>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel pl={'0'}>
                      <Box>
                        <Heading size={'xs'} pt={0}>
                          Cat selection
                        </Heading>
                        <Text fontSize={'sm'} pt={1}>
                          Player 1 is responsible for choosing a cat, this cat
                          is translated into a numerical secret used as an input
                          into a zero-knowledge circuit (= the challenge).
                        </Text>
                      </Box>
                      <Box>
                        <Heading size={'xs'} pt={4}>
                          Inviting Player 2
                        </Heading>
                        <Text fontSize={'sm'} pt={1}>
                          Player 2 can connect to the game after following a
                          link shared by Player 1. This establishes a P2P
                          connection between those two.
                        </Text>
                      </Box>
                      <Box>
                        <Heading size={'xs'} pt={4}>
                          Guessing the cat
                        </Heading>
                        <Text fontSize={'sm'} pt={1}>
                          Once Player 2 attempts to guess which cat was
                          originally selected, a zero-knowledge proof confirming
                          the correctness of the guess is generated. Player 2
                          then uses this proof to verify if the guess is
                          correct.
                        </Text>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Box>
          </Box>
        </Flex>

        <Flex
          direction="column"
          justifyContent={'center'}
          alignItems={'center'}
          width={{ base: '100%', md: '300px' }}
        >
          <Button
            colorScheme="teal"
            width={'100%'}
            rightIcon={<ChevronRightIcon />}
          >
            Start the game
          </Button>
          <Divider mt={3} mb={2} />
          <Text align="center" fontSize="xs" as="i">
            Don't want to start the game by yourself? Wait for an invite link
            instead.
          </Text>
        </Flex>
      </Flex>
    </PageLayout>
  );
};
