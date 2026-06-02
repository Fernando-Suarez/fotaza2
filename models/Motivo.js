import {Model,DataTypes} from 'sequelize';
import sequelize from "../db/config.js";

export class Motivo extends Model {}
Motivo.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },nombre:{
        type: DataTypes.STRING(50),
        allowNull: false,
        unique:true,
        validate:{
            notEmpty: true
        }
    }
},{
    sequelize,
    modelName: 'Motivo',
    tableName: 'motivos',
    
})