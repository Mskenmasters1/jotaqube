export interface IUsuario {
  email: string;
  password: string;
}

export interface ILoginResponse {
  email: string; // Devuelve el email
  token: string;
}
