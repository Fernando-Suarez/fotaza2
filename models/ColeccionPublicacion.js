import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/config.js';

export class ColeccionPublicacion extends Model {}

ColeccionPublicacion.init({
    coleccion_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false
    },
    publicacion_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false
    }
},{
    sequelize,
    modelName:'ColeccionPublicacion',
    tableName:'coleccion_publicacion',
    timestamps:false
});