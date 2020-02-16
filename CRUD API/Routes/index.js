const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({message: 'Tudo OK com o método GET da raiz'});
});

router.post('/', (req, res) => {
    return res.send({message: 'Tudo OK com o método POST da raiz'});
});

router.put('/', (req, res) => {
    return res.send({message: 'Tudo OK com o método PUT da raiz'});
});

router.delete('/', (req, res) => {
    return res.send({message: 'Tudo OK com o método DELETE da raiz'});
});


module.exports = router;