import * as Joi from 'joi';

export const UserSchema = Joi.object({
  firstName: Joi.string().min(5).label('First name').example('John'),
  lastName: Joi.string().label('Last name').example('Doe'),
  email: Joi.string().email().label('Email').example('john@doe.com'),
});

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}