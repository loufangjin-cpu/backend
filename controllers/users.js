const usersModel = require('../models/users')
const { hash } = require('../tools/bcrypt')

// 注册用户
const signup = async (req, res, next) => {
  // 设置返回数据格式
  res.set('content-type', 'application/json; charset=utf-8')
  const { username, password } = req.body
  // 获取加密后的密码
  const bcryptPassword = await hash(password)
  // 判断用户名是否存在
  let findResult = await usersModel.findUsername(username)
  // 如果数据库存在此用户，不再重复添加
  if (findResult) {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户名已存在。'
      })
    })
  } else {
    // 数据库里没有这个用户，开始添加用户
    let result = await usersModel.signup({
      username,
      password: bcryptPassword
    })

    res.render('success', {
      data: JSON.stringify({
        message: '注册成功！'
      })
    })
  }
}

// 获取用户列表
const list = async (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')
  let userList = await usersModel.findUserList()
  res.render('success', {
    data: JSON.stringify(userList)
  })
}

// 删除用户列表
const remove = async (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')
  const { id } = req.body
  await usersModel.removeUser(id)
  res.render('success', {
    data: JSON.stringify({
      message: '删除成功！'
    })
  })
}
exports.signup = signup
exports.list = list
exports.remove = remove