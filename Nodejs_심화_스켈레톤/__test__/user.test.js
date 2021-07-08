const connect = require("../src/schema");
const server = require('../src/server');
const supertest = require('supertest');
const User = require("../src/schema/User");

const userIds = [];
beforeAll(async () => {
    await connect();
    const user = await User.create({ username: 'something', password: '1234' });
    userIds.push(user._id);
});

describe('test for auth', () => {
    app = supertest(server);
    it('too short password', async () => {
        const res = await app.post('/api/auth/sign-up').send({
            username: 'another',
            password: '123',
            passwordConfirmation: '123',
        });
        expect(res.status).toBe(400);
        expect(res.text).toBe('비밀번호는 4자이상이며 닉네임을 포함하면 안됩니다.');
    });

    it('password includes username', async () => {
        const res = await app.post('/api/auth/sign-up').send({
            username: 'another',
            password: 'another',
            passwordConfirmation: 'another',
        });
        expect(res.status).toBe(400);
        expect(res.text).toBe('비밀번호는 4자이상이며 닉네임을 포함하면 안됩니다.');
    });

    it('duplicated username', async () => {
        const res = await app.post('/api/auth/sign-up').send({
            username: 'something',
            password: '12345678',
            passwordConfirmation: '12345678',
        });
        expect(res.status).toBe(400);
        expect(res.text).toBe('중복된 닉네임입니다.');
    });

    it('weird username', async () => {
        const res = await app.post('/api/auth/sign-up').send({
            username: '가나다라마',
            password: '12345678',
            passwordConfirmation: '12345678',
        });
        expect(res.status).toBe(400);
        expect(res.text).toBe('닉네임은 3자이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9) 를 포함해야합니다.');
    });

    it('too short username', async () => {
        const res = await app.post('/api/auth/sign-up').send({
            username: 'a',
            password: '12345678',
            passwordConfirmation: '12345678',
        });
        expect(res.status).toBe(400);
        expect(res.text).toBe('닉네임은 3자이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9) 를 포함해야합니다.');
    });

    it('incorrect password and passwordConfirmation', async () => {
        const res = await app.post('/api/auth/sign-up').send({
            username: 'superman',
            password: 'asdfqwer',
            passwordConfirmation: '12345678',
        });
        expect(res.status).toBe(400);
        expect(res.text).toBe('비밀번호가 일치하지 않습니다.');
    });

    it('incorrect password and passwordConfirmation', async () => {
        const res = await app.post('/api/auth/sign-up').send({
            username: 'superman',
            password: 'waterbalm',
            passwordConfirmation: 'waterbaml',
        });
        expect(res.status).toBe(400);
        expect(res.text).toBe('비밀번호가 일치하지 않습니다.');
    });
});

afterAll(async () => {
    await User.deleteMany({ _id: userIds });
})