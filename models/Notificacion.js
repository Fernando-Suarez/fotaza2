import {Model,DataTypes} from 'sequelize';
import sequelize from "../db/config.js";

export class Notificacion extends Model {}
Notificacion.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },tipo:{
        type: DataTypes.ENUM('COMENTARIO','VALORACION','SEGUIDOR'),
        allowNull: false,
    },usuario_destino:{
        type: DataTypes.INTEGER,
        allowNull: false
    },usuario_origen:{
        type: DataTypes.INTEGER,
        allowNull: false
    },fotografia_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    },leida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    sequelize,
    modelName: 'Notificacion',
    tableName: 'notificaciones',
    timestamps:true,
    
})