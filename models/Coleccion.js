import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/config.js';

export class Coleccion extends Model {}

Coleccion.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type: DataTypes.STRING(100),
        allowNull:false
    },
    usuario_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    modelName:'Coleccion',
    tableName:'colecciones',
    timestamps:true
});
