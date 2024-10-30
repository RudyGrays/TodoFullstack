export interface User {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  login: string;
  imLeader?: boolean;
}

export interface UserDTO {
  token?: string;
  user?: User;
  error?: string;
}

export interface UserSchema {
  isLoading?: boolean;
  error?: string;
  isAuth?: boolean;
  userData?: User;
  _init?: boolean;
}
