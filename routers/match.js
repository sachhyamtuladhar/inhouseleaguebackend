const router = require('express').Router()


router.route('/')
    .get(
        (req,res,next)=>{
            res.json({
                msg: 'match get request'
            })
        }
    )

module.exports = router