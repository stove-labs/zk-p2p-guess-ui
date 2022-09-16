import { ChakraProvider, Button, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';

export const theme = extendTheme({
  styles: {
    global: {
      '#root, body, html': {
        width: '100%',
        height: '100%',
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
}

export default App;
