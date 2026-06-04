import {DataTypes,Model} from 'sequelize';
import sequelize from '../db/config.js';
import bcrypt from 'bcrypt';


export class Usuario extends Model {
    async validatePass(password){
        return bcrypt.compare(password,this.password);
    }
}

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
        type: DataTypes.ENUM('ADMIN','CLIENTE'),
        allowNull:false,
        defaultValue: 'CLIENTE'
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
    timestamps: true,
    paranoid: true,
    hooks:{
        beforeSave: async (usuario) => {
            if(!usuario.password)return;
            if(!usuario.changed('password')) return;
            const hashedPass = await bcrypt.hash(usuario.password, 10);
            usuario.password = hashedPass;
        }
    }
})