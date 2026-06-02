import {DataTypes,Model} from 'sequelize';
import sequelize from '../db/config.js';

export class Comentario extends Model {}

Comentario.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    texto:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },usuario_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },fotografia_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
    }
},{
    sequelize,
    modelName:'Comentario',
    tableName: 'comentarios',
    createdAt: true,

    
})
