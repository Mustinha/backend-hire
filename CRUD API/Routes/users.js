const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
    Users.find({}, (err, data) => {
        if(err) return res.status(500).send({ error: 'Erro ao consultar usuário!'});
        return res.send(data);
    });
});

router.get('/:id', (req, res) => {
    Users.find({_id: req.params.id}, (err, data) => { 
        if(err) return res.status(500).send({ error: 'Erro ao consultar usuário!'});
        return res.send(data);
    });
});


router.post('/create', (req, res) => {
    const { userName, firstName, lastName, dayBirth, email, password } = req.body;
    
    if (!userName || !firstName || !lastName || dayBirth || !email || !password) return res.status(400).send({ error: 'Os dados estão incompletos!'});
    
    Users.findOne({email}, (err, data) => {
        if(err) return res.status(500).send({ error: 'Erro na busca de usuário!'});
        if(data) return res.status(400).send({ error: 'Usuário já está registrado!'});

        Users.create(req.body, (err, data) => { 
            if (err) {
                console.log(`Erro ao cadastrar usuário!`, err);
                return res.status(400).send({ error: 'Erro ao cadastrar usuário!'});
            };
           return res.status(200).send({ message: `Usuário criado com sucesso! id: ${data._id}`});
        });    
    });
});

router.post('/auth', (req, res) => {
    const { userName, firstName, lastName, dayBirth, email, password } = req.body;

    if (!userName || !firstName || !lastName || dayBirth || !email || !password) return res.status(400).send({ error: 'Os dados estão incompletos!'});

    Users.findOne({email}, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'Erro na busca de usuário!'});
        };
        if(!data) return res.status(400).send({ error: 'Usuário não registrado!'});

        bcrypt.compare(password, data.password, (err, same) => {
          if (!same) return res.status(401).send({ error: 'Erro ao autenticar usuário!'});
          
          data.password = undefined 
          return res.send(data);
        });
    }).select('+password');
});

router.put('/:id', (req, res) => {
    Users.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next();
        };    
        return res.status(200).send({ message: 'Informações atualizadas!'});
    });
});

router.delete('/:id', (req, res) => {
    Users.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) {
          console.log(err);
          return next();
      };  
      return res.status(200).send({ message: 'Usuário deletado com sucesso!'});
  });
});
    


module.exports = router;