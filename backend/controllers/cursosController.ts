import { Request, Response } from 'express';
import { Curso } from '../models/curso';

export const getCursos = async (req: Request, res: Response) => {
  try {
    const cursos = await Curso.findAll();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({
      msg: 'Error en el acceso a datos'
    });
  }
};

export const insertCurso = async (req: Request, res: Response) => {
  const { nombre } = req.body;

  try {
    const curso = await Curso.create({
      nombre
    });

    res.status(200).json({
      curso: curso
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    });
  }
};