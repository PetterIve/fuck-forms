import classnames from 'classnames';
import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';

import './FuckFormInput.scss';

export interface FuckFormError {
  messages: string[];
}

export interface FuckFormInputProps {
  error?: FuckFormError;
  key: string;
  label: string;
  onValueChanged: (newValue: string)=> void;
}

export const FuckFormInput = (props: FuckFormInputProps) => {
  const {error, key, label, onValueChanged} = props;

  const [value, setValue] = useState('');
  useEffect(() => {
    onValueChanged(value)
  }, [value]);
  const parseValue = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);


  const [focused, setFocused] = useState();

  const labelClassName = classnames({ focused: focused || value.length > 0 });

  return (
    <div key={key} className="fuck-form-input__container">
      <label className={labelClassName}  htmlFor={key}>{label}</label>
      <input onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} value={value} onChange={parseValue} />
      {error && <ul>
        {error.messages.map(error => (
          <li>{error}</li>
        ))}
      </ul>}
    </div>
  )
}