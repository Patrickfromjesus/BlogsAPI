# BlogsAPI
Projeto BlogsApi realizado durante a formação acadêmica na Trybe com o objetivo de desenvolver uma API e um banco de dados para a produção de conteúdo para um blog.
Foi desenvolvida um aplicação em `Node.js` usando `sequelize` para fazer um `CRUD` dos posts desse blog.
**Quando utilizado o sinal `<>` neste documento, significa que é necessária a utilização do token de autorização nas requisições.

# endpoint `/login` 
Ao utilizá-lo com o método <strong>POST</strong>, o usuário fará login no blog e receberá um token de autorização para fazer requisições nas tabelas, com expiração em 10 minutos.

# endpoint `/user <>`
1. Ao utilizá-lo com o método <strong>POST</strong>, o usuário pode criar um novo user, com displayName, email, senha e image (url opcional). Ao fazer essa requisição, automaticamente é feito o login e retornado um token para acesso a outos tipos de requisições.

2. Ao utilizá-lo com o método <strong>GET</strong>, pode-se escolher entre passar ou não um id no endpoint. Será retornada a informação do usuário desejado ou de todos os usuários, se optar por não passar id específico.

# endpoint `/categories <>`
1.  Ao utilizá-lo com o método <strong>POST</strong>, pode-se criar uma nova categoria para ser adicionada em um post do blog.

2. Ao utilizá-lo com o método <strong>GET</strong>, pode-se ter acesso a todas as categorias existentes no banco de dados.

