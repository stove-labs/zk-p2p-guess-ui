import constate from 'constate';
import { useCallback, useState } from 'react';

export const useP2P = () => {
  const [peer, setPeer] = useState<number>();

  const createPeer = useCallback(async () => {
    return await new Promise<string>((resolve, reject) => {
      const peerId = '1';
      resolve(peerId);
    });
  }, [setPeer]);

  return { createPeer };
};

export const [P2PProvider, useP2PContext] = constate(useP2P);
