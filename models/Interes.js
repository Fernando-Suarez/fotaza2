import {DataTypes,Model} from 'sequelize';
import sequelize from '../db/config.js';

export class Interes extends Model {}

Interes.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,

    },
    usuario_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fotografia_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

},{
    sequelize,
    modelName:'Interes',
    tableName: 'interesados',
    timestamps:true,
    indexes:[{
        unique:true,
        fields:['usuario_id', 'fotografia_id']
    }]
})

