import { AbstractControl, ValidationErrors } from "@angular/forms";

export function atLeastOneSelectedValidator(control: AbstractControl): ValidationErrors | null {
  const formArray = control as any;
  const atLeastOneSelected = formArray.controls.some((group: any) => group.get('selected')?.value === true);
  return atLeastOneSelected ? null : { required: true };
}