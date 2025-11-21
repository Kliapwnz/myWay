import React from 'react';

type Props = {
   value: string
}

export const EditableSpan = ({value}: Props) => {
   return (
      <span>{value}</span>
   );
};

