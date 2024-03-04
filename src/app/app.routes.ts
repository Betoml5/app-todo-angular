import { Routes } from '@angular/router';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoContainerComponent } from './components/todo-container/todo-container.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoContainerComponent,
  },
  {
    path: 'todo/:id',
    component: TodoItemComponent,
  },

  // { path: 'about', component: AboutComponent },
];
