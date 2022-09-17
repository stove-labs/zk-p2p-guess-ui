import { Heading, Text } from '@chakra-ui/react';
import { useStopwatch } from 'react-timer-hook';

export const TimeElapsed: React.FC = () => {
  // keep track of how long this step is taking (compilation + waiting for p2p connection)
  const { seconds, minutes } = useStopwatch({ autoStart: true });
  return (
    <>
      <Heading size={'lg'}>
        {minutes < 60 ? (minutes < 10 ? `0${minutes}` : minutes) : '> 60min'}
        {':'}
        {seconds < 10 ? `0${seconds}` : seconds}
      </Heading>
      <Text fontSize={'xs'} color={'gray.500'}>
        Time elapsed
      </Text>
    </>
  );
};
