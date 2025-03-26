import React from "react";

type FormControllProps = {
  labelText?: string;
  outputText?: string | number;
  inputAttr: { [key: string]: any }
};

export default function FormControl({ labelText, outputText, inputAttr }: FormControllProps) {
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex justify-end gap-1 text-xs'>
        <label htmlFor={`${outputText}`}>{labelText}</label>
        <output>{outputText}</output>
      </div>
      <input id={`${outputText}`} {...inputAttr} style={{ cursor: 'pointer' }} />
    </div>
  );
}