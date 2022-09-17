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
import { TimeElapsed } from '../../../TimeElapsed';

export type InviteFriendProps = {
  peerId?: string;
  selectedCat: Cat;
};

export const InviteFriend: React.FC<InviteFriendProps> = ({
  peerId,
  selectedCat,
}) => {
  // link is only valid if a peerId is available
  const sharableLink = useMemo(
    () => peerId && `http://localhost/challenge/${peerId}`,
    [peerId]
  );

  const toast = useToast();
  const [copiedValue, copy] = useCopyToClipboard();

  const handleCopyLink = useCallback(() => {
    // if a link exists, copy it to clipboard
    sharableLink && copy(sharableLink);
    // notify the user that the link is now in their clipboard
    toast({
      title: 'Link copied!',
      description: `Don't forget to send it to your friend!`,
      status: 'success',
      isClosable: true,
    });
  }, [toast, copy, sharableLink]);
  // true if the user has already copied the link
  const hasCopied = useMemo(() => !!copiedValue, [copiedValue]);

  return (
    <StepLayout width={{ base: '100%', md: '500px' }}>
      <Box>
        <Box>
          <Heading>Invite a friend</Heading>
        </Box>
        <Box pt={1}>
          <Text>
            Time to invite your friend! We'll have to generate a shareable link
            first. You will be moved to the next step once your friend joins via
            your invite link!
          </Text>
        </Box>
      </Box>
      <Box pt={12}>
        <Center justifyContent={'space-between'}>
          <Box width={'200px'}>
            <CatImage selected={true} image={selectedCat.image} />
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
                isLoading={!sharableLink}
                loadingText={'Copy invite link'}
                leftIcon={<CopyIcon />}
                width={'100%'}
                minWidth={'220px'}
                onClick={handleCopyLink}
                p={3}
              >
                Copy invite link
              </Button>

              {hasCopied ? (
                <Text
                  visibility={sharableLink ? 'visible' : 'hidden'}
                  pt={1.5}
                  color={'gray.500'}
                  fontSize={'xs'}
                >
                  <Spinner size={'xs'} /> Waiting for your friend to connect...
                </Text>
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
