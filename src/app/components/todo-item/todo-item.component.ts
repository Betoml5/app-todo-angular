import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo-container/todo-container.component';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  public todoId: string = '';
  public todo: Todo | undefined;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.todoId = params['id'];
      console.log(params['id']);
      console.log(this.getTodoFromLocalStorage(params['id']));
      this.todo = this.getTodoFromLocalStorage(params['id']);
    });
  }

  getTodoFromLocalStorage(text: string): Todo | undefined {
    const todos = window.localStorage.getItem('todos');
    if (todos) {
      const parsedTodos: Todo[] = JSON.parse(todos);
      return parsedTodos.find(
        (todo: Todo) => todo.text.toLowerCase() === text.toLowerCase()
      );
    }

    return undefined;
  }
}
