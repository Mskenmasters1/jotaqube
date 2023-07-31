import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/usuario';
import { generarJWT } from '../helpers/generarJWT';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Verificamos si el email existe
    const usuario = await Usuario.findOne({
      where: {
        email: email
      }
    });

    if (!usuario) {
      return res.status(401).json({
        msg: 'Usuario / Password no son correctos - email'
      });
    }

    // Verificamos la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.dataValues.password);
    if (!validPassword) {
      return res.status(401).json({
        msg: 'Usuario / Password no son correctos - password'
      });
    }

    // Generamos el JWT. El idUsuario es propiedad opcional en la interface, por eso lo comprobamos antes, si no da error
    const token =
      usuario.dataValues.idUsuario && (await generarJWT(usuario.dataValues.idUsuario, usuario.dataValues.roles_idRol));

    await usuario.update({ ...usuario.dataValues, token: token as string });
    res.status(200).json({
      usuario: usuario.dataValues.email,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Se ha producido un error'
    });
  }
};
