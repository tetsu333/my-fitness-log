export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

export type UserRegister = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
