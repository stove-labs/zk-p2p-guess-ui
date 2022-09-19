import { verify } from 'snarkyjs';
import { JsonProof } from './getProofFromGuess';

export const verifyProof = async (
  proof: JsonProof,
  verificationKey: string
): Promise<boolean> => {
  return await verify(proof, verificationKey);
};
