import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type Props = {
   onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {
   const [itemTitle, setItemTitle] = useState("")
   const [error, setError] = useState<string | null>(null)

   const createItemHandler = () => {
      const trimmedTitle = itemTitle.trim()
      if (trimmedTitle !== '') {
         onCreateItem(trimmedTitle)
         setItemTitle('')
      } else {
         setError("Title is required")
      }
   }
   const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setItemTitle(event.currentTarget.value)
      setError(null)
   }
   const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
         createItemHandler()
      }
   }
   return (
      <div>
         <TextField label={'Enter a title'}
                    variant={'outlined'}
                    value={itemTitle}
                    size={'small'}
                    error={!!error}
                    helperText={error}
                    onChange={changeItemTitleHandler}
                    onKeyDown={createItemOnEnterHandler}
         />
         <IconButton onClick={createItemHandler} color={'primary'}>
            <AddBoxIcon/>
         </IconButton>
      </div>
   );
};

