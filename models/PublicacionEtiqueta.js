import {DataTypes,Model} from 'sequelize';
import sequelize from '../db/config.js';

export class PublicacionEtiqueta extends Model {}

PublicacionEtiqueta.init({
    publicacion_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true
    },etiqueta_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
    }
},{
    sequelize,
    modelName:'PublicacionEtiqueta',
    tableName: 'publicacion_etiqueta',
    
})
