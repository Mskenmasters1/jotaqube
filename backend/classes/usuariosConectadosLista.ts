import { UsuarioConectado } from './usuarioConectado';

export class UsuariosConectadosLista {
	private usuariosConectados: UsuarioConectado[];
	constructor() {
		this.usuariosConectados = [];
	}

	addUsuario(email: string | undefined, idSesion: string): void {
		if (email) {
			const usuario = this.usuariosConectados.find((x) => x.email === email);
			if (usuario) {
				this.usuariosConectados = this.usuariosConectados.filter((x) => x.email !== email);
			}

			const nuevoUsuario = new UsuarioConectado(email, idSesion);
			this.usuariosConectados.push(nuevoUsuario);
		}
	}

	addToCurso(email: string, curso: string): void {
		const usuario = this.usuariosConectados.find((x) => x.email === email);
		if (usuario) {
			usuario.curso = curso;
		}
	}

	removeUsuario(idSesion: string): void {
		this.usuariosConectados = this.usuariosConectados.filter((x) => x.idSesion !== idSesion);
	}

	removeUsuarioCerrarSesion(email: string): void {
		const usuario = this.usuariosConectados.find((x) => x.email === email);
		if (usuario) {
			usuario.curso = '';
		}
	}

	getUsuarios(): UsuarioConectado[] {
		return this.usuariosConectados;
	}

	getCursoUsuario(idSesion: string): string {
		return this.usuariosConectados.find((x) => x.idSesion === idSesion)?.curso || '';
	}

	getUsuariosDeCurso(curso: string): UsuarioConectado[] {
		const usuariosDeCurso = this.usuariosConectados.filter((x) => x.curso === curso);
		return usuariosDeCurso;
	}
}