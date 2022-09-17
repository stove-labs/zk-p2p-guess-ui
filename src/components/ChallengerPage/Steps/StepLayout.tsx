import { Box, BoxProps, Center } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export type StepLayoutProps = PropsWithChildren<{
  width: BoxProps['width'];
}>;

// TODO: unify step title/description
export const StepLayout: React.FC<StepLayoutProps> = ({ children, width }) => {
  return (
    <Center>
      <Box pt={10} width={width}>
        {children}
      </Box>
    </Center>
  );
};
