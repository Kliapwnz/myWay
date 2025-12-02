import {addTodolistAc, todolistsReducer} from "./todolists-reducer";
import {beforeEach, expect, test} from 'vitest'
import {tasksReducer} from "./tasks-reducer";
import {TasksState, Todolist} from "../App";

test('ids should be equals', () => {
   const startTasksState: TasksState = {}
   const startTodolistsState: Todolist[] = []

   const action = addTodolistAc('new todolist')

   const endTasksState = tasksReducer(startTasksState, action)
   const endTodolistsState = todolistsReducer(startTodolistsState, action)

   const keys = Object.keys(endTasksState)
   const idFromTasks = keys[0]
   const idFromTodolists = endTodolistsState[0].id

   expect(idFromTasks).toBe(action.payload.todolistId)
   expect(idFromTodolists).toBe(action.payload.todolistId)
})
