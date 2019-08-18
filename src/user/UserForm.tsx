import { UserSchema } from './UserSchema';
import * as React from 'react';
import * as Joi from 'joi';
import { FuckFormError, FuckFormInput, FuckFormInputProps } from './input/FuckFormInput';
import { FormEvent, useState } from 'react';
import { ValidationErrorItem } from 'joi';

interface FuckFormProps<T> {
  onFormSubmitted: (object: T) => void;
}

interface JoiChildSchema{
  _flags: {
    label?: string
  }
}

interface JoiChild {
  key: string;
  schema: JoiChildSchema;
}

type FuckFormErrorMap = Map<string, FuckFormError>;

export const UserForm = <T extends {}> (props: FuckFormProps<T>) => {
  const { onFormSubmitted } = props;
  // @ts-ignore
  const children: JoiChild[] = UserSchema._inner.children;

  const [formState, setFormState] = useState({});
  const setFormKey = (key: string, value: any) => {
    const currentState = {...formState};
    // @ts-ignore
    currentState[key] = value;
    setFormState(currentState);
  }

  const [errorMap, setErrorMap] = useState<FuckFormErrorMap>(new Map());

  const mapped: FuckFormInputProps[] = children.map(child => {
    const {key} = child;
    const label = child.schema._flags.label;
    if (!label) {
      console.error(`Child with key ${key} was not passed the required field label`);
    }
    return {
      error: errorMap.get(child.key),
      key: child.key,
      label: label!,
      onValueChanged: (newValue: string) => setFormKey(key, newValue)
  }});

  const inputs = mapped.map(inputProps => (
    <FuckFormInput {...inputProps}/>
  ))

  const submit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    const result = Joi.validate(formState, UserSchema, {abortEarly: false, presence: 'required'})
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

  return (
    <form onSubmit={submit} className="user-form">
      <legend>User</legend>
      {inputs}
      <button>Submit</button>
    </form>
  )
}