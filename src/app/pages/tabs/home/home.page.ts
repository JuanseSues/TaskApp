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

  tasks: Task[] = []
  user = {} as User;
  loading: boolean = false;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.getTasks(); 
    this.getUser(); 
  }


  getUser() {
    return this.user = this.utilSvc.getElementFromLocalStorage('user');
  }

  getPercetage(task: Task){
    return this.utilSvc.getPercetage(task);
  }

  async addOrUpdateTask(task?: Task){
    let res = await this.utilSvc.presentModal({
      component: AddUpdateTaskComponent,
      componentProps: { task },
      cssClass: 'add-update-modal'
    })

    if (res && res.success){
      this.getTasks();
    }

  }

  getTasks(){

    let user: User = this.utilSvc.getElementFromLocalStorage('user');

    let path = `users/${user.uid}`;

    this.loading = true;


    let sub = this.firebaseSvc.getSubCollection(path, 'tasks').subscribe({
      next: (res: Task[]) => {
        console.log(res);
        this.tasks = res;
        sub.unsubscribe();
        this.loading = false;
      }
    })
  }

  confirmDeleteTask(task: Task){
    this.utilSvc.presentAlert({
      header: 'Delete task',
      message: 'Do you want to delete this task?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          
        }, {
          text: 'Yes',
          handler: () => {
            this.deleteTask(task);
          }
        }
      ]
    })
  }

  deleteTask(task: Task){
    let path = `users/${this.user.uid}/tasks/${task.id}`;

    this.utilSvc.presentLoading();

    
    this.firebaseSvc.deleteDocument(path).then(res => {

      this.utilSvc.presentToast({
        message: 'Task deleted successfully',
        duration: 2000,
        color: 'success',
        icon: 'checkmark-circle-outline'
      })

      this.getTasks();

      this.utilSvc.dismissLoading();

    }, error => {

      this.utilSvc.presentToast({
        message: error,
        duration: 5000,
        color: 'warning',
        icon: 'alert-circle-outline'
      })

      this.utilSvc.dismissLoading();

    })
  }

}
