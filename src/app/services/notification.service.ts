import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(public toastController: ToastController) {}

  async showError(message) {
    const toast = await this.toastController.create({
      header: "Error",
      message: message,
      duration: 5000,
      color: "danger",
      closeButtonText: "Close",
      showCloseButton: true
    });

    toast.present();
  }

  async showSuccess(message) {
    const toast = await this.toastController.create({
      header: "Success",
      message: message,
      duration: 5000,
      color: "success",
      closeButtonText: "Close",
      showCloseButton: true
    });

    toast.present();
  }
}
