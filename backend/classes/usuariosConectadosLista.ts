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

  addToSala(email: string, sala: string): void {
    const usuario = this.usuariosConectados.find((x) => x.email === email);
    if (usuario) {
      usuario.sala = sala;
    }
  }

  removeUsuario(idSesion: string): void {
    this.usuariosConectados = this.usuariosConectados.filter((x) => x.idSesion !== idSesion);
  }

  removeUsuarioCerrarSesion(email: string): void {
    const usuario = this.usuariosConectados.find((x) => x.email === email);
    if (usuario) {
      usuario.sala = '';
    }
  }

  getUsuarios(): UsuarioConectado[] {
    return this.usuariosConectados;
  }

  getSalaUsuario(idSesion: string): string {
    return this.usuariosConectados.find((x) => x.idSesion === idSesion)?.sala || '';
  }

  getUsuariosDeSala(sala: string): UsuarioConectado[] {
    const usuariosDeSala = this.usuariosConectados.filter((x) => x.sala === sala);
    return usuariosDeSala;
  }
}