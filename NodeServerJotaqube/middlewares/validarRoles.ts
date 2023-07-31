import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const esAdminRol = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-token')!;

  try {
    const { rol } = jwt.verify(token, process.env.SECRETPRIVATEKEY || '') as jwt.JwtPayload;

    // Verificamos si es administrador
    if (rol !== 1) {
      return res.status(401).json({
        msg: 'No es administrador - No puede hacer esto'
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido'
    });
  }
};
