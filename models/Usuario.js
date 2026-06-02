import {DataTypes,Model} from 'sequelize';
import sequelize from '../db/config.js';

export class Usuario extends Model {}

Usuario.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,

    },
    nombre:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(50),
        allowNull: false,
        unique:true

    },
    password:{
        type:DataTypes.STRING(),
        allowNull: false,

    },
    rol:{
        type: DataTypes.ENUM('admin','cliente'),
        allowNull:false,
        defaultValue: 'cliente'
    },
    activo:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true,
    },
    avatar:{
        type: DataTypes.BLOB

    }

},{
    sequelize,
    modelName:'Usuario',
    tableName: 'usuarios',
    createdAt: true,
    updatedAt: true,
})