const zod = require('zod');

const createUrl = zod.object({
    mainUrl : zod.string(),
    //shortUrl : zod.string()
})

module.exports = {
    createUrl : createUrl
}