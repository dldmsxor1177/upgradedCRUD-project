const express = require('express');
const OnlyAuthenticated = require('../middlewares/OnlyAuthenticated');
const Board = require('../schema/Board');
const Comment = require('../schema/Comment');
const router = express.Router();


// 게시물 생성
router.post('/', OnlyAuthenticated, async (req, res) => {
    const data = ''; //TODO: 데이터를 어디서 받아야할까요?
    data.writer = ''; //TODO: 작성자를 담아주세요
    const board = '' //TODO: 데이터를 담아주어야 해요! 우리는 게시물을 생성하고있습니다.
    await board.save();
    res.status = 200;
    res.send(board._id);
});

// 게시물 목록 호출
router.get('', async (req, res) => {
    const boards = ''; //TODO: 게시물 목록을 호출 할때, '누가' 썼는지 정보가 필요해요
    res.statusCode = 200;
    res.send(boards);
});

// 게시물 호출
router.get('/:boardId', async (req, res) => {
    const board = ''; //TODO: 한 개의 게시물을 호출해주세요!
    res.statusCode = 200;
    res.send(board);
});

// 게시물 수정
router.patch('/:boardId', OnlyAuthenticated, async (req, res) => {
    const board = '' //TODO: 특정 게시물을 수정 해야해요! 권한이 있는 사람으로 검색해야겠죠~?
    if (String(board.writer._id) !== String(req.user._id)) {
        res.statusCode = 403;
        res.send('권한이 없습니다.');
        return;
    }
    board.content = ''; //TODO: 입력 받은 데이터로 데이터베이스 내용을 업데이트 해주어야해요
    await board.save();
    res.statusCode = 200;
    res.send(board._id);
});

// 게시물 삭제
router.delete('/:boardId', OnlyAuthenticated, async (req, res) => {
    const board = ''; //TODO: 어떤 게시물을 삭제 할 건가요~? 게시물을 특정지을 수 있어야겠어요 -> 지울 수 있는 권한이 있는 사람으로 검색해야겠죠~?
    if (String(board.writer._id) !== String(req.user._id)) {
        res.statusCode = 403;
        res.send('권한이 없습니다.');
        return;
    }
    await board.delete();
    res.statusCode = 200;
    res.send();
});

// 댓글 생성
router.post('/:boardId/comments', OnlyAuthenticated, async (req, res) => {
    const board = ''//TODO: 댓글을 달 게시물을 특정 지어 주어야해요!
    const data = '' //TODO: Post방식으로 서버로 들어온 데이터를 받아주어야합니다
    data.writer = req.user;
    data.board = board;
    const comment = ''; //TODO: 댓글을 추가하려고 합니다!
    await comment.save();
    res.statusCode = 200;
    res.send(comment);
});

// 댓글 목록 호출
router.get('/:boardId/comments', async (req, res) => {
    const comments = ''; //TODO: 댓글은 게시글에 달려있어요. 게시글을 조건으로 걸어줘야 해당하는 글이 호출 되겠죠~?
    res.statusCode = 200;
    res.send(comments);
});

// 댓글 업데이트
router.patch('/:boardId/comments/:commentId', OnlyAuthenticated, async (req, res) => {
    const comment = ''; //TODO: 업데이트 할 댓글을 불러와야해요! 호출과 조건이 비슷하겠네요!
    if (String(comment.writer._id) !== String(req.user._id)) {
        res.statusCode = 403;
        res.send('권한이 없습니다.');
        return;
    }
    comment.content = ''; //TODO: 업데이트 할 내용을 받아와야아해요!
    await comment.save();
    res.statusCode = 200;
    res.send();
});

//댓글 삭제
router.delete('/:boardId/comments/:commentId', OnlyAuthenticated, async (req, res) => {
    const comment = ''; //TODO: 삭제할 댓글이 어떤 댓글인가요~? 특정 댓글을 불러와야겠네요~!
    if (String(comment.writer._id) !== String(req.user._id)) {
        res.statusCode = 403;
        res.send('권한이 없습니다.');
        return;
    }
    await comment.delete();
    res.statusCode = 200;
    res.send();
});


module.exports = router;
