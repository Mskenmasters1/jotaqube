import { DataTypes, Model } from 'sequelize';
import { db } from '../database/config';
import { Sala } from './sala';
import { Usuario } from './usuario';

interface MensajeAttributes {
  idMensaje?: number;
  texto: string;
  fechaHora: Date;
  salas_idSala: number;
  usuarios_email: string;
}

export const Mensaje = db.define<Model<MensajeAttributes>>(
  'Mensaje',
  {
    idMensaje: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    texto: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    fechaHora: {
      type: DataTypes.DATE,
      allowNull: false
    },
    salas_idSala: {
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

Sala.hasMany(Mensaje, {
  sourceKey: 'idSala',
  foreignKey: 'salas_idSala'
});

Usuario.hasMany(Mensaje, {
  sourceKey: 'email',
  foreignKey: 'usuarios_email'
});

Mensaje.belongsTo(Sala, { foreignKey: 'salas_idsala' });
Mensaje.belongsTo(Usuario, { foreignKey: 'usuarios_email' });
