import {Model,DataTypes} from 'sequelize';
import sequelize from "../db/config.js";

export class Denuncia extends Model {}
Denuncia.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },descripcion:{
        type: DataTypes.TEXT,
        allowNull: true,
    },usuario_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },fotografia_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },motivo_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    sequelize,
    modelName: 'Denuncia',
    tableName: 'denuncias',
    timestamps: true,
    indexes:[{
        unique: true,
        fields:['usuario_id', 'fotografia_id']
    }]
})