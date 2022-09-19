import { isReady, PrivateKey, PublicKey } from 'snarkyjs';
import {
  challangeHashToContract,
  compiledContractToVerificationKey,
} from 'zk-p2p-guess/src/helpers';
import { RPCCommandMessage, RPCResponseMessage } from '../workers';
import log from 'loglevel';
log.setDefaultLevel('DEBUG');

const privateKeyJSON = {
  s: '2221840510018593325346886852244642890678926503995097692136933338343303739537',
};

export const getVerificationKeyFromChallangeHash = async (
  challangeHash: string
): Promise<string> => {
  log.debug('waiting for snarkyjs to be ready');
  await isReady;

  log.debug('generating a random private key');
  const randomPrivateKey = PrivateKey.fromJSON(privateKeyJSON)!;
  log.debug('generated a random private key', randomPrivateKey);

  log.debug(
    'compiling the snarkyjs contract with challange hash:',
    challangeHash
  );
  console.time('compile');
  const { compiledContract } = await challangeHashToContract(
    randomPrivateKey,
    challangeHash
  );

  const verifcationKey = compiledContractToVerificationKey(compiledContract);

  log.debug(
    'compiled the snarkyjs contract, this is the verification key ',
    verifcationKey
  );
  console.timeEnd('compile');
  return verifcationKey;
};

onmessage = async (e: RPCCommandMessage<string>) => {
  log.debug('message recieved', e);
  const verifcationKey = await getVerificationKeyFromChallangeHash(e.data);
  const responseMessage: RPCResponseMessage<string> = {
    status: 'success',
    data: verifcationKey,
  };

  log.debug('responding with message', responseMessage);
  postMessage(responseMessage);
};
