import { Request, Response } from 'express';
import { Usuario } from '../models/usuario';
import bcryptjs from 'bcryptjs';

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error en el acceso a datos'
    });
  }
};

export const getUsuarioPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);

  try {
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({
        msg: `No existe un usuario con el id ${id}`
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: 'Error en el acceso a datos'
    });
  }
};

export const insertUsuario = async (req: Request, res: Response) => {
  const { email, password, roles_idRol } = req.body;

  try {
    // Encriptar la contraseña (hash)
    // bcrypt nos pide que para encriptar agreguemos un salt
    // Un salt es un fragmento aleatorio que se usará para generar el hash asociado al password
    // Así evitamos que el hash sea el mismo para el mismo password. El valor que se genera es aleatorio y se guarda en la base de datos
    // getSaltSync permite elegir el "saltRounds", es decir, cuantas "vueltas" utiliza para generar el valor. Por defecto son 10 y es considerado un número equilibrado
    // entre el tiempo de generación y la seguridad
    const salt = bcryptjs.genSaltSync();
    const passwordEncriptado = bcryptjs.hashSync(password, salt);

    const usuario = await Usuario.create({
      email,
      password: passwordEncriptado,
      roles_idRol
    });

    res.status(201).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    });
  }
};

// export const putUsuario = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { body } = req;

//   try {
//     const usuario = await Usuario.findByPk(id);
//     if (!usuario) {
//       return res.status(404).json({
//         msg: 'No existe un usuario con el id ' + id
//       });
//     }

//     await usuario.update(body);

//     res.status(200).json(usuario);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: 'Hable con el administrador'
//     });
//   }
// };

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return res.status(404).json({
      msg: 'No existe un usuario con el id ' + id
    });
  }

  // await usuario.update({ estado: false });
  await usuario.destroy();
  res.status(200).json(usuario);
};
