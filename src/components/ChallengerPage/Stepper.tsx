import { Button, Container, Flex, Text } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { PropsWithChildren } from 'react';
import { PageLayout } from '../PageLayout/PageLayout';
import { ChooseCat } from './Steps/ChooseCat/ChooseCat';

export type Step = {
  label: string;
  description: string;
  content: React.FC<PropsWithSteps<any>>;
};

export type Cat = {
  // id also used as the challenge secret
  id: string;
  // base 64
  image: string;
};

export type StepperProps = {
  steps: Step[];
};

export type PropsWithSteps<T> = PropsWithChildren<{
  nextStep: ReturnType<typeof useSteps>['nextStep'];
}>;

export const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const { nextStep, prevStep, activeStep, reset } = useSteps({
    initialStep: 0,
  });

  return (
    <PageLayout>
      <Flex flexDir="column" width="100%">
        <Steps activeStep={activeStep}>
          {steps.map(({ label, description, content: Content }, i) => (
            <Step description={description} label={label} key={label}>
              <div key={`i-${label}`}>
                {i === activeStep && <Content nextStep={nextStep} />}
              </div>
            </Step>
          ))}
        </Steps>
      </Flex>
    </PageLayout>
  );
};
