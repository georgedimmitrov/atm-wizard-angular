import {FormControl} from "@angular/forms";
import {positiveNumberValidator} from "./positive-number-validator";

describe('positiveNumberValidator', () => {
  const validatorFn = positiveNumberValidator();
  const control = new FormControl('input');

  it('should return null when a positive number is passed in', () => {
    control.setValue(1234);
    expect(validatorFn(control)).toBeNull();
  })

  it('should return error object when a negative number is passed in', () => {
    control.setValue(-1234);
    expect(validatorFn(control)).toEqual({ nonPositive: { value: -1234 } });
  })
});
