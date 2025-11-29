import type {TasksState} from '../App'
import {addTodolistType, DeleteTodolistActionType} from "./todolists-reducer";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
   switch (action.type) {
      case 'add_todolist': {
         return {...state, [action.payload.id]:[]}
      }
      case "delete_todolist": {
         const newState = {...state}
         delete newState[action.payload.id]
         return newState
      }
      default:
         return state
   }
}

type Actions = addTodolistType | DeleteTodolistActionType

