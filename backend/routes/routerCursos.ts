import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos';
import { cursoExiste } from '../helpers/dbValidators';
import { getCursos, insertCurso } from '../controllers/cursosController';

export const routerCursos = Router();

routerCursos.get('/', getCursos);

routerCursos.post(
  '/',
  [
    check('nombre', 'El nombre del curso es obligatorio').not().isEmpty(),
    check('nombre').custom(cursoExiste),
    validarCampos
  ],
  insertCurso
);