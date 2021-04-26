// 引入 mongoose ，连接本地的xiaomai数据库。
var mongoose = require('mongoose')
// connect() 返回一个状态待定（pending）的连接
mongoose.connect('mongodb://localhost/xiaomai',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// 每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的构成。
var userSchema = mongoose.Schema({
  username: String,
  password: String
});
var Users = mongoose.model('users', userSchema);

exports.Users = Users