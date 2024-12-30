import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model'; 
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateTaskComponent } from 'src/app/shared/components/add-update-task/add-update-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  // Array to hold tasks
  tasks: Task[] = []
  // Object to hold user information
  user = {} as User;
  // Boolean to indicate loading state
  loading: boolean = false;

  constructor(
    private firebaseSvc: FirebaseService, // Inject Firebase service
    private utilSvc: UtilsService         // Inject utility service
  ) { }

  // Lifecycle hook that is called after the component's view has been initialized
  ngOnInit() {
    
  }

  // Lifecycle hook that is called when the view is about to enter and become the active view
  ionViewWillEnter() {
    this.getTasks(); // Fetch tasks
    this.getUser();  // Fetch user information
  }

  // Method to get user information from local storage
  getUser() {
    return this.user = this.utilSvc.getElementFromLocalStorage('user');
  }

  // Method to get the percentage of task completion
  getPercetage(task: Task){
    return this.utilSvc.getPercetage(task);
  }

  // Method to add or update a task
  async addOrUpdateTask(task?: Task){
    let res = await this.utilSvc.presentModal({
      component: AddUpdateTaskComponent, // Component to be presented in the modal
      componentProps: { task },          // Pass the task as a prop to the component
      cssClass: 'add-update-modal'       // CSS class for the modal
    })

    // If the modal returns a success response, fetch the tasks again
    if (res && res.success){
      this.getTasks();
    }
  }

  // Method to fetch tasks from Firebase
  getTasks(){
    let user: User = this.utilSvc.getElementFromLocalStorage('user'); // Get user information from local storage
    let path = `users/${user.uid}`; // Construct the path to the user's tasks

    this.loading = true; // Set loading state to true

    // Subscribe to the tasks sub-collection in Firebase
    let sub = this.firebaseSvc.getSubCollection(path, 'tasks').subscribe({
      next: (res: Task[]) => {
        console.log(res);
        this.tasks = res; // Update the tasks array with the fetched tasks
        sub.unsubscribe(); // Unsubscribe from the observable
        this.loading = false; // Set loading state to false
      }
    })
  }

  // Method to confirm task deletion
  confirmDeleteTask(task: Task){
    this.utilSvc.presentAlert({
      header: 'Delete task', // Alert header
      message: 'Do you want to delete this task?', // Alert message
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Yes',
          handler: () => {
            this.deleteTask(task); // Call deleteTask method if user confirms
          }
        }
      ]
    })
  }

  // Method to delete a task from Firebase
  deleteTask(task: Task){
    let path = `users/${this.user.uid}/tasks/${task.id}`; // Construct the path to the task

    this.utilSvc.presentLoading(); // Show loading indicator

    // Call deleteDocument method from Firebase service
    this.firebaseSvc.deleteDocument(path).then(res => {
      this.utilSvc.presentToast({
        message: 'Task deleted successfully', // Show success toast message
        duration: 2000,
        color: 'success',
        icon: 'checkmark-circle-outline'
      })

      this.getTasks(); // Fetch tasks again

      this.utilSvc.dismissLoading(); // Dismiss loading indicator

    }, error => {
      this.utilSvc.presentToast({
        message: error, // Show error toast message
        duration: 5000,
        color: 'warning',
        icon: 'alert-circle-outline'
      })

      this.utilSvc.dismissLoading(); // Dismiss loading indicator
    })
  }

}