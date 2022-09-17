import { Center, Container } from '@chakra-ui/layout';
import { PropsWithChildren } from 'react';

export const PageLayout: React.FC<
  PropsWithChildren<{ slightlySmaller?: boolean }>
> = ({ children, slightlySmaller }) => {
  return (
    <Container
      height={'100%'}
      maxWidth={{ base: '100%', md: slightlySmaller ? '900px' : '1000px' }}
      pt={10}
    >
      {children}
    </Container>
  );
};
