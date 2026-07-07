interface FlowStepperProps {
  steps: readonly string[];
}

export function FlowStepper({ steps }: FlowStepperProps) {
  return (
    <ol className="flow-stepper">
      {steps.map((step, index) => (
        <li key={step} className="flow-stepper__item">
          <span className="flow-stepper__num">{index + 1}</span>
          <span className="flow-stepper__label">{step}</span>
        </li>
      ))}
    </ol>
  );
}
