import type {TasksState} from '../App'
import {addTodolistType, DeleteTodolistActionType} from "./todolists-reducer";
import {v1} from "uuid";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
   switch (action.type) {
      case 'add_todolist': {
         return {...state, [action.payload.id]: []}
      }
      case "delete_todolist": {
         const newState = {...state}
         delete newState[action.payload.id]
         return newState
      }
      case "delete_task" : {
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
         }
      }
      case "add_task" : {
         return {
            ...state,
            [action.payload.todolistId]: [{
               id: v1(),
               title: action.payload.title,
               isDone: false
            }, ...state[action.payload.todolistId]]
         }
      }
      default:
         return state
   }
}
export type deleteTaskType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todolistId: string, taskId: string): deleteTaskType => {
   return {type: "delete_task", payload: {todolistId, taskId}} as const

}
export type createTaskType = ReturnType<typeof createTaskAC>
export const createTaskAC = (todolistId: string, title: string): createTaskType => {
   return {type: "add_task", payload: {todolistId, title}}
}

type Actions = addTodolistType | DeleteTodolistActionType | deleteTaskType | createTaskType

