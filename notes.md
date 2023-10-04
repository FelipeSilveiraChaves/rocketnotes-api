============
**Node**
============

- [**Node**](#node)
- [VERBOS HTTP](#verbos-http)
- [ROUTE PARMS](#route-parms)
- [QUERY PARMS](#query-parms)
- [CONTROLLERS](#controllers)
- [MIDDLEWARE](#middleware)
- [**BANCO DE DADOS**](#banco-de-dados)
  - [SQL](#sql)
    - [COMANDOS DDL](#comandos-ddl)
- [CRUD \& COMANDOS DML](#crud--comandos-dml)
  - [NOMEANDO DADOS](#nomeando-dados)
    - [INT (Integer)](#int-integer)
    - [VARCHAR (Variable Character)](#varchar-variable-character)
    - [CHAR (Character)](#char-character)
    - [DATE e TIME (Character)](#date-e-time-character)
    - [FLOAT e DOUBLE](#float-e-double)
    - [BOOLEAN](#boolean)
    - [BLOB e CLOB](#blob-e-clob)
    - [JSON e XML](#json-e-xml)
- [USANDO VARIAVEIS NO BANCO DE DADOS](#usando-variaveis-no-banco-de-dados)
- [INNER JOIN](#inner-join)
- [ENV](#env)
  - [SINTAXE NO .ENV](#sintaxe-no-env)
  - [SINTAXE NO CODIGO](#sintaxe-no-codigo)


# VERBOS HTTP

`GET` = Leitura
`POST` = Criação
`PUT` = Atualização
`DELETE` = Deleção
`PATCH` = Atualização parcial

======================

# ROUTE PARMS
- Usados mais para informações mais simples **(como id)**

- Basicamente pode passar *parâmetros* no endereço do site/api/lugar onde está hospedado.

```js
app.get('/message/:id/:user', (request, response) => {
    const {id, user} = request.params;
    
    response.send(`
    Id da mensagem: ${id}.
    Para o usuário: ${user}.
    `);
});
```
no metódo get o endereço é colocado dois lugares de "variáveis" em não serão lidos como parte do endereço e sim como *parâmetros* (para isso é necessário o uso dos `:`)

# QUERY PARMS

É muito paracido com o ``Route Parms`` porém a principal diferença é que **não são obrigatórios** por isso não são passados como dependência na url.

```js
app.get('/users', (request, response) => {
    const { page, limit } = request.query;

    response.send(`Página: ${page}. Mostrar: ${limit}`);
});
```
http://xn--endereo-zxa/users?page=5&limit=10

Para chama-los voce coloca primeiro o *?* para o navegador entender que chegou neles, depois a semânctica é *"NomeDoParms=valor"* e se tiver outro parâmetro usar o E comercial *&*


# CONTROLLERS

```js
class UsersController {
    /**
     * index - GET para listar varios registros
     * show - GET para exibir um registro especifico
     * create - POST para criar um registro
     * update - PUT para atualizar um registro
     * delete - DELETE para remover um registro
     * Se precisar criar mais de 5 metodos, pode ser que precisa separar os controllers
     **/
}
module.exports = UsersController
```
NAO É OBRIGADO A TER TODOS OS 5, pode ser que tenha um só também, tu que sabe

# MIDDLEWARE

Middleware consegue fazer o intermedio entre a *request* e a *response*, assim podendo fazer verificações e ligações, das tarefas que estão sendo feita

```js
function MyMidlleware(request, response, next){
    console.log("Voce possou pelo Middleware!");
    console.log(request.body);

    next();
}

const userController = new UsersController();

usersRoutes.post('/', MyMidlleware, userController.create)
```
tu coloca o middleware depois do path e antes da função

==================
**BANCO DE DADOS**
==================

```js
    const sqlite3 = require("sqlite3");
    const sqlite = require("sqlite");
    const path = require("path");

    async function sqliteConnection(){
        const database = await sqlite.open({
            filename: path.resolve(__dirname, "..", "database.db"),
            driver: sqlite3.Database,
        });
        
        return database
    }

    module.exports = sqliteConnection

```
Isso é a estrutura padrão de conexão com o Database, sendo o *sqlite3* o driver do *sqlite*, e o path uma biblioteca do NodeJS para facilitar a navegação de diretórios

## SQL
SQL não significa banco de dados, e sim a linguagem que os bancos de dados entendem, por isso de muitos bancos de dados terem SQL no nome.
```SQL
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR,
        email VARCHAR,
        password VARCHAR,
        avatar VARCHAR NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
```

PRIMARY KEY - que será unico 



### COMANDOS DDL

**CREATE:** Usado para criar tabelas, índices, ou outros objetos no banco de dados.

**ALTER:** Usado para modificar a estrutura de uma tabela existente.

**DROP:** Usado para excluir tabelas, índices ou outros objetos do banco de dados.


# CRUD & COMANDOS DML

*C - Create* ===> INSERT 
*R - Read* ===> SELECT
*U - Update* ===> UPDATE
*D - Delete* ===> DELETE

Crud é a filosofia e o da direta é os comandos do DML

**INSERT:** Usado para adicionar novos registros a uma tabela.

**SELECT:** Usado para recuperar dados de uma ou mais tabelas.

**UPDATE:** Usado para modificar registros existentes em uma tabela.

**DELETE:** Usado para remover registros de uma tabela.

```sql
INSERT INTO users
(name, email, password)
VALUES 
('Rafael Freitas Chaves', 'Rafaeledificar@gmail.com','123');


SELECT * FROM users ;


UPDATE users SET 
avatar = 'felipe.png', 
name = 'Felipe Chaveees'
WHERE id = 1;

DELETE FROM users 
WHERE id = 3;
```
LEMBRAR sempre usar o **WHERE** pra especificar com o *id* pra que não tenha erro de excluir a table inteira.


## NOMEANDO DADOS 

=======================

### INT (Integer) 
- Aramazena números inteiros

### VARCHAR (Variable Character) 
- String de comprimento variável. (especifica o tamanho máximo do campo)
- ex: `VARCHAR(30)` maximo 30.

### CHAR (Character) 
- Mesmo que o `VARCHAR` só que é fixo
- ex: `CHAR(8)` sempre sera 8, o que faltar o banco de dado completa com espaços em branco.

### DATE e TIME (Character) 
- Dependendo do SGBD, pode ter variações, como `DATETIME`, `TIMESTAMP`, etc.

### FLOAT e DOUBLE
- Números decimais, `FLOAT` precisão simples, `DOUBLE` mais preciso, vulgo precisão dupla.

### BOOLEAN 
- Booleano

### BLOB e CLOB
- Esses tipos de dados são usados para armazenar dados binários grandes `(BLOB)` e texto longo `(CLOB)`,
como imagens, arquivos, ou grandes blocos de texto.

### JSON e XML
- Em SGBDs mais modernos, você pode encontrar tipos de dados especializados para armazenar dados `JSON (JSON)` e dados `XML (XML)`.


# USANDO VARIAVEIS NO BANCO DE DADOS

```js
await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
```
A *utilização* de variaveis do banco de dados se da dessa maneira, coloque entre parenteses com interrogações dentro
para cada variavel que deseja pegar no banco de dados *(?, ?, ?)*, depois do codigo do sql separe com virgula e coloque
na ORDEM que tem que ser dentro de chaves cada coluna. Tem que seguir a mesma ordem.

segue um exemplo de verificação de email:
```js
const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])

 if(checkUserExist){
    throw new AppError("Este e-mail já está em uso.")
}
```

# INNER JOIN

É o responsavel por unir tabelas, atraves da **Chave Primária** de uma e da **Chave Estrangeira** de outra





# ENV

Uma biblioteca usada para criar **variaveis de ambiente**, para que não deixe os *dados sensiveis* visiveis no gitHub.

crie um arquivo .env para as suas variaveis com o seus *dados sensiveis*, e coloque .env no .gitIngore, mas para as pessoas terem ciência das variveis de ambiente crie um .env.exemple com os nomes das variaveis mas sem conteudos só para as pessoas terem noção do que precisa no .env

## SINTAXE NO .ENV
no arquivo do .env tu usa uma sintaxe bem simple, quase sem sintaxe no caso:

AUTH_SECRET=valor
SERVER_PORT=valor

## SINTAXE NO CODIGO

```js
const PORT = process.env.SERVER_PORT || 3000;
```

ali tem a barra reta para que caso a pessoa nao saiba o que usar ainda nao travar a aplicação, mas sempre sera essa sintaxe no codigo
