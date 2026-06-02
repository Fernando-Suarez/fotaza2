import {DataTypes,Model} from 'sequelize';
import sequelize from '../db/config.js';

export class Seguidor extends Model {}

Seguidor.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    seguidor_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },seguido_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
    }
},{
    sequelize,
    modelName:'Seguidor',
    tableName: 'seguidores',
    timestamps: true,
    indexes:[
        {
            unique:true,
            fields:['seguidor_id','seguido_id']
        }
    ]
    
})
