// File: projects/design-system/src/lib/components/toast/toast.service.ts
import { Injectable, inject, NgZone, ComponentRef } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToastComponent, ToastType } from './toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, type: ToastType = 'info', duration: number = 5000): void {
    const snackBarRef = this.snackBar.openFromComponent(ToastComponent, {
      duration: duration,
      panelClass: type,
    });

    // Get the ToastComponent instance directly
    const toastComponentRef = snackBarRef.instance;

    toastComponentRef.message = message;
    toastComponentRef.type = type;

    snackBarRef.afterDismissed().subscribe(() => {
      // Handle any cleanup after the toast is dismissed
    });

    toastComponentRef.dismiss.subscribe(() => {
      snackBarRef.dismiss();
    });
  }

  success(message: string, duration: number = 5000): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration: number = 5000): void {
    this.show(message, 'error', duration);
  }

  info(message: string, duration: number = 5000): void {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration: number = 5000): void {
    this.show(message, 'warning', duration);
  }

  triggerToast(type: ToastType, message: string, duration?: number) {
    this.show(message, type, duration);
  }
}