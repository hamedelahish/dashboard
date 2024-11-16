import { AbstractControl, ValidatorFn } from '@angular/forms';

export function maxImagesValidator(maxImages: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const files = control.value;
    return files && files.length > maxImages ? { 'maxImages': true } : null;
  };
}
