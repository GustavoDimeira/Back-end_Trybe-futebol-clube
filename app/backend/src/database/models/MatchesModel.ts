import { DataTypes, Model } from 'sequelize';

import db from '.';

class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  homeTeamId: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  awaiTeamId: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  awayTeamsGoals: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  inProgress: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Matche',
  tableName: 'Matches',
  timestamps: false,
});

export default Match;
