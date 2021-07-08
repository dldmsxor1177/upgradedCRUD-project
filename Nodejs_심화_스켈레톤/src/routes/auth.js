const express = require('express'); // 익스프레스!
const User = require('../schema/User'); // 데이터베이스에서 유저!
const router = express.Router(); // 라우터를 가져와서 적용할거에요!


// 회원가입
router.post('/sign-up', async (req, res) => {
    const { username, password, passwordConfirmation } = req.body;

    const exists = ''; // TODO:입력받은 username을 가지고 데이터베이스에서 사용자르 찾아야합니다. post가 async이기에 await이 앞에 붙으면 좋을 것 같아요 
    if (exists) {
        res.statusCode = 400;
        res.send(`중복된 닉네임입니다.`);
        return;
    }

    // 닉네임 검증 reg
    if (!/[a-zA-Z0-9]+/.test(username) || username.length < 3) {
        res.statusCode = 400;
        res.send(`닉네임은 3자이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9) 를 포함해야합니다.`);
        return;
    }

    // 패스워드 검증
    if (password.includes(username) || password.length < 4) {
        res.statusCode = 400;
        res.send(`비밀번호는 4자이상이며 닉네임을 포함하면 안됩니다.`);
        return;
    }

    // 두 패스워다가 같은지 검사
    if (password !== passwordConfirmation) {
        res.statusCode = 400;
        res.send(`비밀번호가 일치하지 않습니다.`);
        return;
    }

    // 모든 검사가 통과 한 후에 
    const user = new User({
        username,
        password,
    });

    //유저를 저장, statusCode 성공 리턴
    await user.save();
    res.statusCode = 200;
    res.send();
});

// 로그인
router.post('/sign-in', async (req, res) => {
    const { username, password } = req.body;


    const user = '';//TODO: 유저가 있는지 데이터베이스에서 검사!

    if (!user) {
        res.statusCode = 400;
        res.send(`닉네임 또는 패스워드를 확인해주세요`);
        return;
    }
    //로그인 정보를 쿠키에 담아주세요!
    //TODO: 로그인 정보를 쿠키에 담는 줄이 여기에 필요합니다!

    res.statusCode = 200; // 쿠키에 잘 담아서 완료!
    res.send();
});


//로그아웃 
router.post('/logout', async (req, res) => {
    //로그아웃을 위해서는 쿠키에 담긴 정보를 지워주어야 합니다!
    //TODO: 쿠키에 담은 유저를 초기화 하는 코드가 필요합니다!

    res.statusCode = 200;
    res.send();
});

module.exports = router;
