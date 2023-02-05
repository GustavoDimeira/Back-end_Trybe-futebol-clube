import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  username: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: true,
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

export default User;
