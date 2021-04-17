const fs = require('fs')
const users = require('../users.json');
const addUser = (req, res) => {
    const { id } = req.body;
    let result = users.find((u) => {
        return u.id == id
    })
    if (!id) {
        return res.status(200).json({ error: 'incorrect input' })
    } else if (result) {
        return res.status(200).json({ error: 'user already exists in db' })
    }
    const obj = {
        id: id,
        cash: 0,
        credit: 0
    }
    users.push(obj);
    const jsonData = JSON.stringify(users);
    fs.writeFileSync("users.json", jsonData);
    return res.send(obj);
}
const depositById = (req, res) => {///depositCash/:id
    const { id } = req.params;
    const { amount } = req.body;
    let user = users.find((u) => {
        return u.id == id
    })
    if (!amount) {
        return res.status(200).send("error in body")
    } else if (id < 0) {
        return res.status(200).send("error in url")
    } else if (amount < 0) {
        return res.status(200).send("deposit amount should be positive")
    } else if (!user) {
        return res.status(200).send("no such user")
    }
    users[id].cash += amount
    const jsonData = JSON.stringify(users);
    fs.writeFileSync("users.json", jsonData);
    res.status(200).send("cash deposited successfully")
}
const updateCreditById = (req, res) => {///updateCredit/:id
    const { id } = req.params;
    const { amount } = req.body;
    let user = users.find((u) => {
        return u.id == id
    })
    if (!amount) {
        return res.status(200).send("error in body")
    } else if (id < 0) {
        return res.status(200).send("error in url")
    } else if (credit < 0) {
        return res.status(200).send("credit should be positive")
    } else if (!user) {
        return res.status(200).send("no such user")
    }
    users[id].credit = amount
    const jsonData = JSON.stringify(users);
    fs.writeFileSync("users.json", jsonData);
    res.status(200).send("credit updated successfully")
}
const withdrawById = (req, res) => {///withdraw/:id
    const { id } = req.params;
    const { amount } = req.body;
    let user = users.find((u) => {
        return u.id == id
    })
    if (!amount) {
        return res.status(200).send("error in body")
    } else if (id < 0) {
        return res.status(200).send("error in url")
    } else if (amount < 0) {
        return res.status(200).send("amount should be positive")
    } else if (users[id].cash + users[id].credit < amount) {
        return res.status(200).send("withdraw amount should be less than cash+credit")
    } else if (!user) {
        return res.status(200).send("no such user")
    }
    users[id].cash -= amount
    const jsonData = JSON.stringify(users);
    fs.writeFileSync("users.json", jsonData);
    res.status(200).send("cash withdrawn successfully")
}
const transfer = (req, res) => {//transfer/
    const { fromId, toId, amount } = req.body;
    let fromUser = users.find((u) => {
        return u.id == fromId
    })
    let toUser = users.find((u) => {
        return u.id == toId
    })
    if (!fromUser || !toUser) {
        return res.status(200).send("error in body")
    } else if (amount < 0) {
        return res.status(200).send("amount should be positive")
    } else if (users[fromId].cash + users[fromId].credit < amount) {
        return res.status(200).send("transfer amount should be less than cash+credit")
    } else if (!fromUser || !toUser) {
        return res.status(200).send("no such user")
    }
    users[fromId].cash -= amount
    users[toId].cash += amount
    const jsonData = JSON.stringify(users);
    fs.writeFileSync("users.json", jsonData);
    res.status(200).send("cash transfered successfully")
}
const getUserById = (req, res) => {//:id
    const { id } = req.params;
    let user = users.find((u) => {
        return u.id == id
    })
    if (!user) {
        return res.status(200).send("no such user")
    } else if (id < 0) {
        return res.status(200).send("error in url")
    }
    res.status(200).json({ user: users[req.params.id] })
}
const getUsers = (req, res) => {
    if (!users) {
        return res.status(200).send("no users")
    }
    return res.send(users);
}

const getFilteredByCash = (req, res) => {//filteredByCash/
    const { amount } = req.body;
    let filteredUsers = users.filter((u) => {
        return u.cash >= amount
    })
    if (amount === null) {
        return res.status(200).send("error in body")
    } else if (!filteredUsers) {
        return res.status(200).send("no such users")
    }
    res.status(200).json({ filteredUsers })
}

module.exports = {
    addUser,
    depositById,
    updateCreditById,
    withdrawById,
    transfer,
    getUserById,
    getUsers,
    getFilteredByCash
}