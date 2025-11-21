import React, {ChangeEvent, useState} from 'react';

type Props = {
   value: string
   onChange: (title: string) => void
}

export const EditableSpan = ({value, onChange}: Props) => {
   const [title, setTitle] = useState(value)
   const [isEditMode, setIsEditMode] = useState(false)

   const turnOnEditMode = () => {
      setIsEditMode(true)
   }
   const turnOffEditMode = () => {
      setIsEditMode(false)
      onChange(title)
   }
   const ChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.currentTarget.value)
   }
   return (
      <>
         {isEditMode ? (
            <input value={title} onChange={ChangeTitle} onBlur={turnOffEditMode} autoFocus/>
         ) : (
            <span onDoubleClick={turnOnEditMode}>{value}</span>
         )}
      </>
   );
};

