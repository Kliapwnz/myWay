import type {Todolist} from '../App'

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
   switch (action.type) {
      case "delete_todolist" : {
         return state.filter(todolist => todolist.id !== action.payload.id)
      }
      default:
         return state
   }
}


export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (id: string): DeleteTodolistActionType => {
   return {type: 'delete_todolist', payload: {id}} as const
}

type Actions = DeleteTodolistActionType