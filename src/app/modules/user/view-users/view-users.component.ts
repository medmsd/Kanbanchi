import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../core/services/user/user.service';
import {User} from '../../../core/models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Task} from '../../../core/models/task';
import {TaskService} from '../../../core/services/task/task.service';
import {MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  private displayedColumns: string[] = ['id', 'name', 'date', 'type'];
  private user: User;
  private tasks: Task[];
  private sortedTasks: Task[];

  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private taskService: TaskService) {

  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.userService.find(id).subscribe((user)=>this.user=user);
    this.taskService.getUserTask(id).subscribe((tasks) => {
      this.tasks = tasks;
      this.sortedTasks = tasks;
      this.dataSource = new MatTableDataSource(this.sortedTasks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const data = this.tasks;
    if (!sort.active || sort.direction === '') {
      this.sortedTasks = data;
      return;
    }

    this.sortedTasks = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'date':
          return this.compare(a.date, b.date, isAsc);
        case 'type':
          return this.compare(a.type, b.type, isAsc);
        default:
          return 0;
      }
    });

  }

  return() {
    this.router.navigate(['/users/list']);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
