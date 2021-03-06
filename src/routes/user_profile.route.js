const express = require("express");
const router = express.Router();
const Task = require('../models/user_profile')

router.get('/profiles', async (req, res) => {
    try {
        const profiles = await Task.find({})
        res.send(profiles)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/profiles/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


router.post('/profiles', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/profiles/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    try {
        if (!isValidOperation) {
            return res.status(400).send('Invalid updates')
        }
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!task) {
            return res.status(404).send("task not found!")
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/profiles/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            res.status(404).send(`profile doesn't exist`)
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;
