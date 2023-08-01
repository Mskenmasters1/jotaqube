import { DataTypes, Model } from 'sequelize';
import { db } from '../database/config';
import { Usuario } from './usuario';
import { Curso } from './curso';

interface CodigoAttributes {
  idCodigo?: number;
  titulo: string;
  codigo: string;
  indicaciones: string;
  fechaHora: Date;
  cursos_idCurso: number;
  usuarios_email: string;
}

export const Codigo = db.define<Model<CodigoAttributes>>(
  'Codigo',
  {
    idCodigo: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
	codigo: {
		type: DataTypes.STRING(),
		allowNull: false
	},
	indicaciones: {
		type: DataTypes.STRING(1000),
		allowNull: false
	  },
    fechaHora: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cursos_idCurso: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usuarios_email: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: 'mensajes'
  }
);

Curso.hasMany(Codigo, {
  sourceKey: 'idSala',
  foreignKey: 'salas_idSala'
});

Usuario.hasMany(Codigo, {
  sourceKey: 'email',
  foreignKey: 'usuarios_email'
});

Codigo.belongsTo(Sala, { foreignKey: 'salas_idsala' });
Codigo.belongsTo(Usuario, { foreignKey: 'usuarios_email' });
