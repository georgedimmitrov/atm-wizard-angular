import { AbstractControl, ValidatorFn } from '@angular/forms';

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const isPositive = Number(control.value) <= 0;
    return isPositive ? { nonPositive: { value: control.value } } : null;
  };
}
