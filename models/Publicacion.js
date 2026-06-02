import {DataTypes,Model} from 'sequelize';
import sequelize from '../db/config.js';

export class Publicacion extends Model {}

Publicacion.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,

    },
    titulo:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    usuario_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

},{
    sequelize,
    modelName:'Publicacion',
    tableName: 'publicaciones',
    createdAt: true,
    updatedAt: true,
})

