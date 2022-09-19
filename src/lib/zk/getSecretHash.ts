import log from 'loglevel';
import { isReady, Poseidon, UInt64 } from 'snarkyjs';
import { RPCCommandMessage, RPCResponseMessage } from '../workers';

/**
 * We don't really need to run this in a webworker, but i was running
 * into wierd 'require is not defined' issues
 * @param secret
 * @returns
 */
export const getSecretHash = async (secret: string): Promise<string> => {
  await isReady;
  return Poseidon.hash(new UInt64(secret).toFields()).toString();
};

onmessage = async (e: RPCCommandMessage<string>) => {
  log.debug('message recieved', e);
  const secretHash = await getSecretHash(e.data);
  const responseMessage: RPCResponseMessage<string> = {
    status: 'success',
    data: secretHash,
  };

  log.debug('responding with message', responseMessage);
  postMessage(responseMessage);
};
