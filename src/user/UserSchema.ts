import * as Joi from 'joi';

export const UserSchema = Joi.object({
  firstName: Joi.string().min(1).label('First name').example('John').error(e => 'Please enter your first name'),
  lastName: Joi.string().label('Last name').example('Doe'),
  email: Joi.string().email().label('Email').example('john@doe.com'),
  age: Joi.number().label('Age').example(18),
  city: Joi.string().label('City').example('Trondheim')
});

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}