export interface SubmissionResult {
  success: boolean;
  errorMessage?: string;
  goToStepIndex?: number;
}

export abstract class Step {
  isSubmitted: boolean = false;
  index: number;

  constructor(index: number) {
    this.index = index;
  }

  abstract getTitle(): string;
}

export abstract class ActionableStep extends Step {
  abstract isValid(): boolean;
  abstract submit(): SubmissionResult;
}
