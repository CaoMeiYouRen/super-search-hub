import express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: 'OK',
    })
})

// 状态监测
router.get('/status', (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: 'OK',
    })
})
router.head('/status', (req, res) => {
    res.status(200).end()
})
export default router