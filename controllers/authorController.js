const asyncHandler = require('express-async-handler')
const Author = require('../models/authorModel')

const getAuthorData = asyncHandler(async (req, res) => {
    const author = await Author.find()
    res.json(author)
})

const postAuthorInfo = asyncHandler(async (req, res) => {
    const { fullname, emails, numbers, imageUrl, about } = req.body
    console.log(numbers)
    console.log(emails)
    if (!fullname || !emails || !numbers || !imageUrl) {
        res.status(400)
        throw new Error("Fields are mandatory")
    }

    const author = await Author.create({
        fullname, emails, numbers, imageUrl, about
    })

    res.status(201).json(author)
})

const updateAuthorInfo = asyncHandler(async (req, res) => {
    const { fullname, emails, numbers, imageUrl, about, id } = req.body
    if (!fullname || !emails || !numbers || !imageUrl) {
        res.status(400)
        throw new Error("Fields are mandatory")
    }

    const author = await Author.findOneAndUpdate(id, {
        fullname, emails, numbers, imageUrl, about
    }, {new: true})

    res.status(201).json(author)
})

const postAuthorLinks = asyncHandler(async (req, res) => {
    const { links } = req.body
    if (!links) {
        res.status(400)
        throw new Error("Fields are mandatory")
    }
    const author = await Author.find()[0]
    author.links = links

    Author.updateOne(author)

    res.status(201).json(author)
})

const postAuthorWebsites = asyncHandler(async (req, res) => {
    const { websites } = req.body
    if (!websites) {
        res.status(400)
        throw new Error("Fields are mandatory")
    }
    const author = await Author.find()[0]
    author.websites = websites

    Author.updateOne(author)

    res.status(201).json(author)
})

module.exports = {
    getAuthorData, postAuthorInfo, postAuthorLinks, postAuthorWebsites, updateAuthorInfo
}