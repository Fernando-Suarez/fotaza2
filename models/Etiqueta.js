import {DataTypes,Model} from 'sequelize';
import sequelize from '../db/config.js';

export class Etiqueta extends Model {}

Etiqueta.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,

    },
    titulo:{
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }

},{
    sequelize,
    modelName:'Publicacion',
    tableName: 'publicaciones',
    createdAt: true,
    updatedAt: true,
})

