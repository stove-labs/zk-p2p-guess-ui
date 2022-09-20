import { extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

export const theme = extendTheme({
  components: { Steps },
  styles: {
    global: {
      '#root, body, html': {
        width: '100%',
        height: '100%',
      },
    },
  },
});
