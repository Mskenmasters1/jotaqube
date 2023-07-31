import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos';
import { getSalas, insertSala } from '../controllers/salasController';
import { salaExiste } from '../helpers/dbValidators';

export const routerSalas = Router();

routerSalas.get('/', getSalas);

routerSalas.post(
  '/',
  [
    check('nombre', 'El nombre de la sala es obligatorio').not().isEmpty(),
    check('nombre').custom(salaExiste),
    validarCampos
  ],
  insertSala
);