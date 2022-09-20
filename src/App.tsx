import { ChakraProvider, Button, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';

import log from 'loglevel';
import { theme } from './theme';

log.setDefaultLevel('DEBUG');

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
}

export default App;
