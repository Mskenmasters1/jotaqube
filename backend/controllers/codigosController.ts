import { Request, Response } from 'express';
import { Codigo } from '../models/codigo';
import { io } from '..';

export const getCodigos = async (req: Request, res: Response) => {
  const { idCurso } = req.params;
  try {
    const codigos = await Codigo.findAll({
      where: {
        cursos_idCurso: Number(idCurso)
      }
    });
    res.status(200).json(codigos);
  } catch (error) {
    res.status(500).json({
      msg: 'Error en el acceso a datos'
    });
  }
};

export const insertCodigo = async (req: Request, res: Response) => {
  const { usuarios_email, titulo, codigo, indicaciones, cursos_idCurso, curso } = req.body;

  try {
    const codigoACT = await Codigo.create({
		usuarios_email,
		titulo,
		codigo,
		indicaciones,
		fechaHora: new Date(),
		cursos_idCurso
	  });
  
    const codigos = await Codigo.findAll({
      where: {
        cursos_idCurso: Number(cursos_idCurso)
      }
    });

    console.log(codigos);
    io.to(curso).emit('codigos-curso', codigos);

    res.status(200).json(codigo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    });
  }
};
