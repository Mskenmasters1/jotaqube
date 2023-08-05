export class UsuarioConectado {
	email: string;
	idSesion: string;
	curso: string;

	constructor(email: string, idSesion: string) {
		this.idSesion = idSesion;
		this.email = email;
		this.curso = '';
	}
}