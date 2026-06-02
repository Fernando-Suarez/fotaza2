import {DataTypes,Model} from 'sequelize';
import sequelize from '../db/config.js';

export class Valoracion extends Model {}

Valoracion.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    puntaje:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },usuario_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },fotografia_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
    }
},{
    sequelize,
    modelName:'Valoracion',
    tableName: 'valoraciones',
    indexes:[ // garantiza una sola valoracion de un usuario sobre una sola  fotografia
        {
            unique:true,
            fields:['usuario_id','fotografia_id']
        }
    ]
    
})
