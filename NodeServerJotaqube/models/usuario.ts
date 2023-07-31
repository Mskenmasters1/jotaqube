import { DataTypes, Model } from 'sequelize';
import { db } from '../database/config';
import { Rol } from './rol';

interface UsuarioAttributes {
  idUsuario?: number;
  email: string;
  password: string;
  token?: string;
  roles_idRol: number;
}

export const Usuario = db.define<Model<UsuarioAttributes>>(
  'Usuario',
  {
    idUsuario: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    roles_idRol: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'usuarios'
  }
);
