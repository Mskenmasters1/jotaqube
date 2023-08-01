import { DataTypes, Model } from 'sequelize';
import { db } from '../database/config';

interface CursoAttributes {
  idCurso?: number;
  nombre: string;
}

export const Curso = db.define<Model<CursoAttributes>>(
  'Curso',
  {
    idCurso: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    tableName: 'cursos'
  }
);
