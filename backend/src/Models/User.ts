import { Role } from './enums';

export interface UserReg {
  username: string;
  password: string;
}

export interface User extends UserReg {
  id_user: number;
  role: Role.user;
  money: 0;
  status: true;
}