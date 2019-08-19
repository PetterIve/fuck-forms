import classnames from 'classnames';
import * as React from 'react';
import * as Joi from 'joi';
import { FuckFormError, FuckFormInput, FuckFormInputProps } from './input/FuckFormInput';
import { FormEvent, useState } from 'react';
import { ValidationErrorItem } from 'joi';

import './FuckForm.scss';

interface FuckFormProps<T> {
  className?: string;
  onFormSubmitted: (object: T) => void;
  schema: Joi.Schema;
}

interface JoiExample {
  value: string;
}

interface JoiChildSchema{
  _examples: JoiExample[];
  _flags: {
    label?: string
  }
}

interface JoiChild {
  key: string;
  schema: JoiChildSchema;
}

type FuckFormErrorMap = Map<string, FuckFormError>;

export const FuckForm = <T extends {}> (props: FuckFormProps<T>) => {
  const { className, onFormSubmitted, schema } = props;

  const [formState, setFormState] = useState({});
  const setFormKey = (key: string, value: any) => {
    const currentState = {...formState};
    // @ts-ignore
    currentState[key] = value;
    setFormState(currentState);
  }

  const [errorMap, setErrorMap] = useState<FuckFormErrorMap>(new Map());

  // @ts-ignore
  const children: JoiChild[] = schema._inner.children;
  const inputProps: FuckFormInputProps[] = children.map(child => {
    const {key} = child;
    let placeholder;
    if (child.schema._examples && child.schema._examples.length > 0 ){
      placeholder = child.schema._examples[0].value;
    }
    const label = child.schema._flags.label;
    if (!label) {
      console.error(`Child with key ${key} was not passed the required field label`);
    }
    return {
      error: errorMap.get(child.key),
      key: child.key,
      label: label!,
      placeholder,
      onValueChanged: (newValue: string) => setFormKey(key, newValue)
  }});

  const inputs = inputProps.map(inputProps => (
    <FuckFormInput {...inputProps}/>
  ))

  const submit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    const result = Joi.validate(formState, schema, {abortEarly: false, presence: 'required'})
    if (result.error) {
      const error: FuckFormErrorMap = result.error.details.reduce((acc: FuckFormErrorMap, curr: ValidationErrorItem) => {
        const path = curr.path[0];
        const error = acc.get(path) || { messages: []};
        error.messages.push(curr.message);
        acc.set(path, error);
        return acc;
      }, new Map())
      setErrorMap(error);
    } else {
      onFormSubmitted((formState as T));
    }
  }

  const formClassName = classnames('fuck-form', className);

  return (
    <form onSubmit={submit} className={formClassName}>
      {inputs}
      <button className="fuck-form__button">Submit</button>
    </form>
  )
}