import { DataTypes, Model } from 'sequelize';

import db from '.';

import Match from './MatchModel';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Team',
  tableName: 'teams',
  timestamps: false,
});

Teams.hasMany(Match, { foreignKey: 'awayTeamId', as: 'away_team_id' });
Teams.hasMany(Match, { foreignKey: 'homeTeamId', as: 'home_team_id' });

Match.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'home_team_id' });
Match.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'away_team_id' });

export default Teams;
