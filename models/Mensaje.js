import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/config.js';

export class Mensaje extends Model {}

Mensaje.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    mensaje:{
        type: DataTypes.TEXT,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },remitente_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },destinatario_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },leido:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
},{
    sequelize,
    modelName:'Mensaje',
    tableName:'mensajes',
    timestamps:true
});