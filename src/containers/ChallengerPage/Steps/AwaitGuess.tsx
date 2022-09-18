import { data } from '../../../components/ChallengerPage/Steps/ChooseCat/ChooseCat.stories';
import { AwaitGuess as AwaitGuessComponent } from './../../../components/ChallengerPage/Steps/AwaitGuess/AwaitGuess';
export const AwaitGuess: React.FC = () => {
  const selectedCat = data.storyCats[0];
  return (
    <AwaitGuessComponent status={'AWAITING_GUESS'} selectedCat={selectedCat} />
  );
};
