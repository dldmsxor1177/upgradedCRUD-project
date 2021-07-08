const mongoose = require('mongoose'); // 이 파일은 데이터를 서버에 연결하기 위한 작업

const connect = () => {
    return mongoose
        .connect('mongodb://localhost:27017/board', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            ignoreUndefined: true
        })
        .catch(err => console.log(err));
};

mongoose.connection.on('error', err => {
    console.error('몽고디비 연결 에러입니다.', err);
});

module.exports = connect;
