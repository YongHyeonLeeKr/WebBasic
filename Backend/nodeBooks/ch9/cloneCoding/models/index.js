const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development'; // NODE_ENV 따로 설정 안하면 'development'
const config = require('../config/config')[env]; // 기본 설정 파일은 'development' 객체
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hasgtag');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = HasgTag;

User.init(sequelize);
Post.init(sequelize)
Hashtag.init(sequelize);

User.associate(db);
Post.associate(db)
Hashtag.associate(db)

module.exports = db;
