import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Item, Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
  standalone: false,
})
export class AddUpdateTaskComponent implements OnInit {

  @Input() task: Task; // Input property to receive the task to be updated
  user = {} as User; // Object to hold user information

  // Form group for the task form
  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(500)]),
    items: new FormControl([], [Validators.required, Validators.minLength(1)]),
  })

  constructor(
    private firebaseSvc: FirebaseService, // Inject Firebase service
    private utilSvc: UtilsService         // Inject utility service
  ) { }

  ngOnInit() {
    this.user = this.utilSvc.getElementFromLocalStorage('user'); // Get user information from local storage

    if (this.task) {
      this.form.setValue(this.task); // Set the form values if a task is provided
      this.form.updateValueAndValidity(); // Update the form validity
    }
  }

  // Method to create or update a task
  submit() {
    if (this.form.valid) {
      if (this.task) {
        this.updateTask(); // Update the task if it exists
      } else {
        this.createTask(); // Create a new task if it doesn't exist
      }
    }
  }

  // Method to create a new task
  createTask() {
    let path = `users/${this.user.uid}`;

    this.utilSvc.presentLoading(); // Show loading indicator
    delete this.form.value.id;

    this.firebaseSvc.addToSubCollection(path, 'tasks', this.form.value).then(res => {
      this.utilSvc.dismissModal({ success: true }); // Dismiss the modal with success

      this.utilSvc.presentToast({
        message: 'Task created successfully',
        duration: 2000,
        color: 'success',
        icon: 'checkmark-circle-outline'
      });

      this.utilSvc.dismissLoading(); // Dismiss loading indicator

    }, error => {
      this.utilSvc.presentToast({
        message: error,
        duration: 5000,
        color: 'warning',
        icon: 'alert-circle-outline'
      });

      this.utilSvc.dismissLoading(); // Dismiss loading indicator
    });
  }

  // Method to update an existing task
  updateTask() {
    let path = `users/${this.user.uid}/tasks/${this.task.id}`;

    this.utilSvc.presentLoading(); // Show loading indicator
    delete this.form.value.id;

    this.firebaseSvc.updateDocument(path, this.form.value).then(res => {
      this.utilSvc.dismissModal({ success: true }); // Dismiss the modal with success

      this.utilSvc.presentToast({
        message: 'Task updated',
        duration: 2000,
        color: 'success',
        icon: 'checkmark-circle-outline'
      });

      this.utilSvc.dismissLoading(); // Dismiss loading indicator

    }, error => {
      this.utilSvc.presentToast({
        message: error,
        duration: 5000,
        color: 'warning',
        icon: 'alert-circle-outline'
      });

      this.utilSvc.dismissLoading(); // Dismiss loading indicator
    });
  }

  // Method to get the percentage of completed items in the task
  getPercetage() {
    return this.utilSvc.getPercetage(this.form.value as Task);
  }

  // Method to handle item reorder
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.form.value.items = ev.detail.complete(this.form.value.items);
    this.form.updateValueAndValidity();
  }

  // Method to remove an item from the task
  removeItem(index: number) {
    this.form.value.items.splice(index, 1);
    this.form.controls.items.updateValueAndValidity();
  }

  // Method to create a new item for the task
  createItem() {
    this.utilSvc.presentAlert({
      header: 'New Activity',
      backdropDismiss: false,
      inputs: [
        {
          name: 'name',
          type: 'textarea',
          placeholder: 'Do something...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Add',
          handler: (res) => {
            let item: Item = { name: res.name, completed: false };
            this.form.value.items.push(item);
            this.form.controls.items.updateValueAndValidity();
          }
        }
      ]
    });
  }

}