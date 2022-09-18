import { Heading, Text } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useStopwatch } from 'react-timer-hook';

export type TimeElapsedProps = {
  paused?: boolean;
};

export const TimeElapsed: React.FC<TimeElapsedProps> = ({ paused }) => {
  // keep track of how long this step is taking (compilation + waiting for p2p connection)
  const { seconds, minutes, pause, isRunning } = useStopwatch({
    autoStart: true,
  });

  useEffect(() => {
    if (paused) pause();
  }, [paused, pause]);

  const wasQuick = useMemo(() => {
    return !isRunning && paused && seconds === 0 && minutes === 0;
  }, [isRunning, paused, seconds, minutes]);

  return (
    <>
      <Heading size={'lg'}>
        {minutes < 60 ? (minutes < 10 ? `0${minutes}` : minutes) : '> 60min'}
        {':'}
        {seconds < 10 ? `0${seconds}` : seconds}
      </Heading>
      <Text fontSize={'xs'} color={'gray.500'}>
        {!wasQuick ? 'Time elapsed' : 'That was quick!'}
      </Text>
    </>
  );
};
