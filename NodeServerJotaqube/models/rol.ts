import { DataTypes, Model } from 'sequelize';
import { db } from '../database/config';
import { Usuario } from './usuario';

interface RolAttributes {
  idRol?: number;
  descripcion: string;
}

export const Rol = db.define<Model<RolAttributes>>(
  'Rol',
  {
    idRol: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    descripcion: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  },
  {
    tableName: 'roles'
  }
);

Rol.hasMany(Usuario, {
  sourceKey: 'idRol',
  foreignKey: 'roles_idRol'
});

Usuario.belongsTo(Rol, { foreignKey: 'roles_idRol' });
