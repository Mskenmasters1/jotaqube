import { Sala } from '../models/sala';
import { Usuario } from '../models/usuario';

export const emailExiste = async (email = '') => {
  const existeEmail = await Usuario.findOne({
    where: {
      email: email
    }
  });

  if (existeEmail) {
    throw new Error(`El email: ${email}, ya está registrado`);
  }
};

export const salaExiste = async (nombre = '') => {
  const existeSala = await Sala.findOne({
    where: {
      nombre: nombre
    }
  });

  if (existeSala) {
    throw new Error(`La sala: ${nombre}, ya está creada`);
  }
};