import { Injectable } from '@angular/core';
import {
  PasswordStrength,
  PasswordStrengthClass,
} from '../interfaces/password.interface';

@Injectable({
  providedIn: 'root',
})
export class StrengthService {
  public passwordStrengthClass: PasswordStrengthClass =
    PasswordStrengthClass.Empty;

  public passwordStrength(password: string): PasswordStrength {
    if (!password) {
      this.passwordStrengthClass = PasswordStrengthClass.Empty;
      return PasswordStrength.Empty;
    }

    if (password.length < 8) {
      this.passwordStrengthClass = PasswordStrengthClass.Weak;
      return PasswordStrength.Short;
    }

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasDigits = /[0-9]/.test(password);
    const hasSymbols = /[\W_]/.test(password);

    if (hasLetters && hasDigits && hasSymbols) {
      this.passwordStrengthClass = PasswordStrengthClass.Strong;
      return PasswordStrength.Strong;
    }

    if ((hasLetters && hasDigits) || (hasLetters && hasSymbols) || (hasDigits && hasSymbols)) {
      this.passwordStrengthClass = PasswordStrengthClass.Medium;
      return PasswordStrength.Medium;
    }

    this.passwordStrengthClass = PasswordStrengthClass.Weak;
    return PasswordStrength.Weak;
  }
}
