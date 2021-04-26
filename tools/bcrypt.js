// 密码加密工具
const bcrypt = require('bcrypt')

exports.hash = (myPlaintextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
            if (err) {
                reject(err)
            } else {
                resolve(hash)
            }
        })
    })
}