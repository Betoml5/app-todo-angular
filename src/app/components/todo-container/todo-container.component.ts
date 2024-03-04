import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface Todo {
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-container',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './todo-container.component.html',
  styleUrl: './todo-container.component.css',
})
export class TodoContainerComponent {
  // todos: Todo[] = [
  //   { text: 'Learn Angular', completed: true },
  //   { text: 'Learn TypeScript', completed: false },
  //   { text: 'Learn JavaScript', completed: false },
  // ];

  todos: Todo[] = [];
  todo: string = '';

  addTodo() {
    if (!this.todo) {
      return;
    }

    this.todos.push({
      text: this.todo,
      completed: false,
    });

    this.todo = '';

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  complete(index: number) {
    if (this.todos[index].completed) {
      this.todos[index].completed = false;
    } else {
      this.todos[index].completed = true;
    }

    window.localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  ngOnInit() {
    if (window.localStorage.getItem('todos')) {
      const todos = window.localStorage.getItem('todos');
      if (todos) {
        this.todos = JSON.parse(todos);
      }
    }
  }

  // ngOnInit() {
  //   if (window.localStorage.getItem('todos')) {
  //     const todos = window.localStorage.getItem('todos');
  //     if (todos) {
  //       this.todos = JSON.parse(todos);
  //     }
  //   }

  //   addEventListener('keypress', (e) => {
  //     if (e.key === 'Enter') {
  //       this.addTodo();
  //     }
  //   });
  // }

  ngOnDestroy() {
    removeEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTodo();
      }
    });
  }
}
