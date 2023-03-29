const asyncHandler = require('express-async-handler')
const Page = require('../models/pageModel')

const getPageData = asyncHandler(async (req, res) => {
    const page = await Page.find()
    res.json(page)
})

const postPageInfo = asyncHandler(async (req, res) => {
    
})

const updatePageInfo = asyncHandler(async (req, res) => {
    
})


module.exports = {
    getPageData, postPageInfo, updatePageInfo
}