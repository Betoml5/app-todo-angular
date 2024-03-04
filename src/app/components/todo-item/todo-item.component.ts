import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo-container/todo-container.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  public todoId: string = '';
  public todo: Todo | undefined;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.todo = this.getTodoFromLocalStorage(params['id']);
    });
  }

  getTodoFromLocalStorage(text: string): Todo | undefined {
    if (window.localStorage !== undefined) {
      const todos = window.localStorage.getItem('todos');
      if (todos) {
        const parsedTodos: Todo[] = JSON.parse(todos);

        return parsedTodos.find(
          (todo: Todo) => todo.text.toLowerCase() === text.toLowerCase()
        );
      }
    }
    return undefined;
  }

  deleteTodoFromLS() {
    if (window.localStorage !== undefined) {
      const todos = window.localStorage.getItem('todos');
      if (todos) {
        const parsedTodos: Todo[] = JSON.parse(todos);
        const newTodos = parsedTodos.filter(
          (todo) => todo.text.toLowerCase() !== this.todo?.text.toLowerCase()
        );
        window.localStorage.setItem('todos', JSON.stringify(newTodos));
      }
    }
  }
}
