import { DataTypes, Model } from 'sequelize';

import db from '.';

import Match from './MatchesModel';

// import OtherModel from './OtherModel';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
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
  tableName: 'Teams',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'awayTeamId', as: 'away_team_id' });
Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'home_team_id' });

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'home_team_id' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'away_team_id' });

export default Team;
