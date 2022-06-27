import { Sequelize } from 'sequelize-typescript'

const sequelize = new Sequelize({
  database: 'some_db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: ':memory:',
  models: [__dirname + '/**/*.model.ts'], // or [Player, Team],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf('.model')) === member.toLowerCase()
    )
  },
})

sequelize.addModels([__dirname + '/**/*.model.ts'])

export default sequelize
