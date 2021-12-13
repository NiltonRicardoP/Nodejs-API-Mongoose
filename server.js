const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connect(SEU_MONGODB_URL,{
    useNewUrlParser: true
}).then(()=>{
    console.log("Sucesso ao conectar ao banco de dados");
}).catch(err => {
    console.log('Não foi possível conectar-se à base de dados. Error...', err);
    process.exit();
});




const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

app.get('/', (req, res)=> {
    res.json({"message": "Server está Rodando !"});
});

let PORT = 8000

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
    require('./app/routes/app.routes.js')(app);
});