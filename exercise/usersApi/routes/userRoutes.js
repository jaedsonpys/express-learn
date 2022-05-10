const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')
const { join } = path

const usersPathJSON = join(__dirname, 'users.json')

const getUsers = () => {
    const users = fs.existsSync(usersPathJSON)
        ? fs.readFileSync(usersPathJSON) // condition to return file data
        : [] // empty if file not exists

    try {
        return JSON.parse(users)
    } catch(error) {
        return []
    }
}

const updateUser = (userID, name, age, work) => {
    var users = getUsers()
    var updatedUsers = []

    users.forEach(element => {
        if(element.id == userID) {
            element.name = name
            element.age = age
            element.work = work
        }

        updatedUsers.push(element)
    })

    fs.writeFileSync(usersPathJSON, JSON.stringify(updatedUsers, null, '\t'))
}

const addUser = (name, age, work) => {
    var lastUsers = getUsers()
    var userID = 0

    lastUsers.forEach(element => {
        if(userID == element.id) {
            userID++
        } else {
            return
        }
    });

    var newUser = {id: userID, name: name, age: age, work: work}

    lastUsers.push(newUser)
    fs.writeFileSync(usersPathJSON, JSON.stringify(lastUsers, null, '\t'))
}

const deleteUser = (userID) => {
    var users = getUsers()
    var updatedUsers = []

    users.forEach(element => {
        if(element.id != userID) {
            updatedUsers.push(element)
        }
    })

    fs.writeFileSync(usersPathJSON, JSON.stringify(updatedUsers, null, '\t'))
}

router.get('/users', (req, res) => {
    var userID = req.query.id
    var allUsers = getUsers()

    if(userID) {
        var user

        allUsers.forEach(element => {
            if(element.id == userID) {
                user = res.json(element)
                return
            }
        })

        if (user) {
            res.json(user)
        } else {
            res.status(404)
            res.json({status: 'ERROR', message: 'User ID not found'})
        }
    } else {
        res.json(getUsers())
    }
})

router.post('/users', (req, res) => {
    var userData = req.body
    addUser(userData.name, userData.age, userData.work)

    res.status(201)
    res.json({status: 'OK', message: 'User added'})
})

router.put('/users', (req, res) => {
    var userID = req.query.id

    if(!userID) {
        res.json({status: 'ERROR', message: 'User ID not available'})
    } else {
        var userData = req.body

        updateUser(userID, userData.name, userData.age, userData.work)
        res.json({status: 'OK', message: 'User updated'})
    }
})

router.delete('/users', (req, res) => {
    var userID = req.query.id

    if(!userID) {
        res.json({status: 'ERROR', message: 'User ID not available'})
    } else {
        var userData = req.body

        deleteUser(userID)
        res.json({status: 'OK', message: 'User deleted'})
    }
})

module.exports = router