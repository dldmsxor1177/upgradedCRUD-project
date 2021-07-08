const User = require("../schema/User");

async function Authenticate(req, res, next) {
    const userId = ''; // 쿠키에서 유저를 가져옵니다
    if (userId) {
        req.user = ''; // 가져온 유저 정보를 가지고 schema/User에서 검색 
    }
    next();
}

module.exports = Authenticate
