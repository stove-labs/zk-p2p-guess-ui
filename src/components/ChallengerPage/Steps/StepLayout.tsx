import { Box, Center } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export type StepLayoutProps = PropsWithChildren<{
  width: string;
}>;

export const StepLayout: React.FC<StepLayoutProps> = ({ children, width }) => {
  return (
    <Center>
      <Box pt={8} width={width}>
        {children}
      </Box>
    </Center>
  );
};
