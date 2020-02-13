import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(name: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const isNameForbidden = name.test(control.value);
        return isNameForbidden ? { forbiddenName: { value: control.value } } : null;
    };
}
