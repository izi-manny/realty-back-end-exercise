const houses = require('./db.json')
let globalId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body

        const newHouse = {
            id: globalId,
            address,
            price,
            imageURL
        }
        houses.push(newHouse)
        res.status(200).send(houses)
    },
    updateHouse: (req, res) => {
        const {id} = req.params
        const {type} = req.body
        
        let index = houses.findIndex((elem) => elem.id === +id)

        // console.log(houses[index])

        if (type === 'plus'){
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if (houses[index].price < 10000 && type === 'minus'){
            res.status(400).send('House price cannot be below $10,000')
        } else if (type === 'minus'){
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else {
            res.status(400).send('Something went wrong')
        }
    },
    deleteHouse: (req, res) => {
        const {id} = req.params

        let index = houses.findIndex((elem) => elem.id === +id)

        houses.splice(index, 1)

        res.status(200).send(houses)
        globalId++
    }
}