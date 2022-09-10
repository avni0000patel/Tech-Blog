const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Get all users
router.get('/', async (req, res) => {
    // /api/users
    // console.log("Working api/users!");

    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [{ model: Post }, { model: Comment }]
        });

        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Get one user
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{ model: Post }, { model: Comment }]
        });

        if (!userData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = userData.id;
            req.session.username = userData.username;


            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    if ((!username, !password)) {
        return res
            .status(400)
            .json({ message: "You did not give me all the info!" });
    }

    try {
        const userData = await User.findOne({
            where: {
                username,
                password
            },
        });

        if (!userData) {
            res.status(400).json({ message: 'No user with that username!' });
            return;
        }

        const validPassword = userData.checkPassword(password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = userData.id;
            req.session.username = userData.username;

            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!userData) {
            res.status(400).json({ message: 'No user found with this id!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!userData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
