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
        type: DataTypes.ENUM('COPYRIGHT','SIN_COPYRIGHT'),
        allowNull: false
    },marca_agua:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    texto_marca_agua:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    comentarios_habilitados:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    publicacion_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

},{
    sequelize,
    modelName:'Fotografia',
    tableName: 'fotografias',
    createdAt: true,
    updatedAt: true,
})

