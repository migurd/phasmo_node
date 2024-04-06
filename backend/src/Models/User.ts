import { Role } from './enums';

export interface UserReg {
  username: string;
  password: string;
}

export interface IUser extends UserReg {
  id_user: number;
  role: Role;
  money: number;
  level: number;
  status: number;
}