export const validateEmail = (value:string) =>
  (/^\S+@\S+$/.test(value) ? null : 'Invalid email');


export const validatePassword = (value:string) =>
  ((value.length>=6)? null: 'Invalid password');
