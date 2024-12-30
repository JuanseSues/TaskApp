import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingController: LoadingController, // Inject LoadingController for loading indicators
    private router: Router,                       // Inject Router for navigation
    private toastController: ToastController,     // Inject ToastController for toast notifications
    private alertController: AlertController,     // Inject AlertController for alerts
    private modalController: ModalController,     // Inject ModalController for modals
  ) { }

  // ------Loading------

  // Method to present a loading indicator
  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }

  // Method to dismiss the loading indicator
  async dismissLoading() {
    return await this.loadingController.dismiss();
  }

  // ------Local Storage------

  // Method to set an element in local storage
  setElementInLocalStorage(key: string, element: any) {
    return localStorage.setItem(key, JSON.stringify(element));
  }

  // Method to get an element from local storage
  getElementFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  // ------Toast------

  // Method to present a toast notification
  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }

  // ------Router Link------

  // Method to navigate to a different URL
  routerLink(url: string) {
    this.router.navigateByUrl(url);
  }

  // ------Alert------

  // Method to present an alert
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);
    await alert.present();
  }

  // ------Modal------

  // Method to present a modal
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      return data;
    }
  }

  // Method to dismiss a modal
  dismissModal(data?: any) {
    this.modalController.dismiss(data);
  }

  // Method to calculate the percentage of completed items in a task
  getPercetage(task: Task) {
    let completedItems = task.items.filter(item => item.completed).length;
    let totalItems = task.items.length;
    let percentage = (100 / totalItems) * completedItems;

    return parseInt(percentage.toString());
  }
}