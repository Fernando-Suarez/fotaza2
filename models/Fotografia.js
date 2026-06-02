import {DataTypes,Model} from 'sequelize';
import sequelize from '../db/config.js';

export class Fotografia extends Model {}

Fotografia.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,

    },
    imagen:{
        type: DataTypes.BLOB('long'),
        allowNull:false
    },
    licencia:{
        type: DataTypes.STRING(50),
        allowNull: false
    },marca_agua:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    publicacion_id:{
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

