const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Get all posts
router.get('/', (req, res) => {
    try {
        const commentData = Comment.findAll({
            include: [{ model: User }, { model: Post }]
        });

        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Get one post
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            where: {
                id: req.params.id
            },
            include: [{ model: User }, { model: Post }]
        });

        if (!commentData) {
            res.status(404).json({ message: "No comment found with this id!" });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create new comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment: req.body.comment,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(commentData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!commentData) {
            res.status(400).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404).json({ message: "No comment found with this id" });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
