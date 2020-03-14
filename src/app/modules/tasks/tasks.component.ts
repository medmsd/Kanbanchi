import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TaskService} from '../../core/services/task/task.service';
import {Task} from '../../core/models/task';
import {UserService} from '../../core/services/user/user.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private tasks: Task[];
  private todo: Task[];
  private done: Task[];
  private doing: Task[];
  private isAdmin: boolean;
  private isDeveloper: boolean;
  private isResponsible: boolean;
  private userID: string;
  constructor(private taskService:TaskService,private userService:UserService) { }

  ngOnInit() {
    this.userID = this.userService.userID.value;
    this.userService.user.subscribe((user) => {
      switch (user.role) {
        case "Admin":
          this.isAdmin=true;
          this.isDeveloper = false;
          this.isResponsible = false;
          break;
        case 'Developer':
          this.isAdmin=false;
          this.isDeveloper = true;
          this.isResponsible = false;
          break;
        case 'Responsible':
          this.isAdmin=false;
          this.isDeveloper = false;
          this.isResponsible = true;
          break;
        default:
          this.isAdmin=false;
          this.isDeveloper = false;
          this.isResponsible = true;
          break;
      }
    });
    this.taskService.findAll().subscribe((tasks)=>{
      this.tasks = tasks;
      this.todo = tasks.filter((task)=>task.type=="todo");
      this.doing = tasks.filter((task)=>task.type=="doing");
      this.done = tasks.filter((task)=>task.type=="done");
    })
  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let type = event.container.id;
      let task: Task = event.previousContainer.data[event.previousIndex];
      task.type = type;
      this.taskService.update(task).subscribe((task)=>{});
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  delete(taskDel: Task) {
   if(confirm("Are you sure you want to delete ?"))
   {
    this.taskService.delete(taskDel.id).subscribe(() => {
      if (taskDel.type == 'todo') {
        this.todo = this.todo.filter((task) => task.id != taskDel.id);
      } else if (taskDel.type == 'doing') {
        this.doing = this.doing.filter((task) => task.id != taskDel.id);
      } else {
        this.done = this.done.filter((task) => task.id != taskDel.id);
      }
    });
   }

  }
}
