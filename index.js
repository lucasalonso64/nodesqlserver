const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3009; //porta padrão
const sql = require('mssql');
const connStr = "Server=BH-DSI-010084L;Database=React;User Id=sa;Password=epc@123;";

//fazendo a conexão global
sql.connect(connStr)
   .then(conn => GLOBAL.conn = conn)
   .catch(err => console.log(err));

//configurando o body parser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());   

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
    GLOBAL.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
}
// rota que lista todos os clientes
router.get('/clientes', (req, res) =>{
    execSQLQuery('SELECT * FROM Contatos', res);

 
})

router.delete('/clientes/:id', (req, res) =>{
    execSQLQuery('DELETE Clientes WHERE ID=' + parseInt(req.params.id), res);
})