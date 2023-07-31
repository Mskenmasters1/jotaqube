// Ruta: /api/usuarios
import { Router } from 'express';
import { getUsuarios, getUsuarioPorId, insertUsuario, deleteUsuario } from '../controllers/usuariosController';
import { check, param } from 'express-validator';
import { emailExiste, esRolValido, existeUsuarioPorId } from '../helpers/dbValidators';
import { validarCampos } from '../middlewares/validarCampos';

// Router es parte de Express. Permite configurar un sistema de rutas. Lo exportamos para utilizarlo en index
export const routerUsuarios = Router();

routerUsuarios.get('/', getUsuarios);
routerUsuarios.get(
  '/:id',
  [param('id').exists().isNumeric().custom(existeUsuarioPorId), validarCampos],
  getUsuarioPorId
);

routerUsuarios.post(
  '/',
  [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').not().isEmpty().isLength({ min: 6 }),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(emailExiste),
    check('roles_idRol').custom(esRolValido),
    validarCampos
  ],
  insertUsuario
);

routerUsuarios.delete(
  '/:id',
  [param('id').exists().isNumeric().custom(existeUsuarioPorId), validarCampos],
  deleteUsuario
);
