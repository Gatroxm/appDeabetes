export interface ReadUserDto {
  token: string;
  email: string;
  img?: string;
  password?: string;
  role: string;
  __v?: number;
  _id: string;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  img?: string;
  peso?: string;
  sexo?: string;
  telefono?: string;
  role: string;
  __v?: number;
  name: string;
}
