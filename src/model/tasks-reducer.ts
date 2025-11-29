import type {TasksState} from '../App'
import {addTodolistType} from "./todolists-reducer";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
   switch (action.type) {
      case 'add_todolist': {
         return {...state, [action.payload.id]:[]}
      }
      default:
         return state
   }
}

type Actions = addTodolistType

