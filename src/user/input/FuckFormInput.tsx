import classnames from 'classnames';
import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';

import './FuckFormInput.scss';

export interface FuckFormError {
  messages: string[];
}

export interface FuckFormInputProps {
  error?: FuckFormError;
  identifier: string;
  label: string;
  onValueChanged: (newValue: string)=> void;
  placeholder?: string;
}

export const FuckFormInput = (props: FuckFormInputProps) => {
  const {error, identifier, label, onValueChanged } = props;

  const [value, setValue] = useState('');
  useEffect(() => {
    onValueChanged(value)
  }, [value]);
  const parseValue = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);


  const [focused, setFocused] = useState();

  const placeholder = focused ? props.placeholder : undefined;
  const shouldInputTranslate = focused || placeholder || value.length > 0;
  const labelClassName = classnames({ 'fuck-form-input__label--focused': shouldInputTranslate }, 'fuck-form-input__label', { 'fuck-form-input__label--error': error });

  const inputClassName = classnames('fuck-form-input', {'fuck-form-input--error': error});

  return (
    <div className="fuck-form-input__container">
      <label className={labelClassName}  htmlFor={identifier}>{label}</label>
      <input
        className={inputClassName}
        id={identifier}
        onBlur={() => setFocused(false)}
        onChange={parseValue}
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        value={value}
      />
      {error && <ul className="fuck-form__error-list">
        {error.messages.map(error => (
          <li>{error}</li>
        ))}
      </ul>}
    </div>
  )
}