const express = require ('express')
const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken')

//GET Transactions by user_id
router.get('/:id', authenticateToken, async (req, res) => {
    const response = await 
})




module.exports = router