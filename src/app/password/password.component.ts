import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  PasswordStrength,
  PasswordStrengthClass,
} from '../interfaces/password.interface';
import { StrengthService } from '../services/strength.service';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [NgClass],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class PasswordComponent {
  public currentPasswordStrength: PasswordStrength = PasswordStrength.Empty;
  public strengthService: StrengthService = inject(StrengthService);

  public evaluatePasswordStrength(event: Event): void {
    const password = (event.target as HTMLInputElement).value;
    this.currentPasswordStrength =
      this.strengthService.passwordStrength(password);
  }

  get passwordStrengthClass(): PasswordStrengthClass {
    return this.strengthService.passwordStrengthClass;
  }
}
