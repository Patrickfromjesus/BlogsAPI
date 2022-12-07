# BlogsAPI
Projeto BlogsApi realizado durante a formação acadêmica na Trybe com o objetivo de desenvolver uma API e um banco de dados para a produção de conteúdo para um blog.
Foi desenvolvida um aplicação em `Node.js` usando `sequelize` para fazer um `CRUD` dos posts desse blog.

<sub>Quando utilizado o sinal `<>` neste documento, significa que é necessária a utilização do token de autorização nas requisições.</sub>

# endpoint `/login` 
Ao utilizá-lo com o método <strong>POST</strong>, o usuário fará login no blog e receberá um token de autorização para fazer requisições nas tabelas, com expiração em 10 minutos.

# endpoint `/user` <>
1. Ao utilizá-lo com o método <strong>POST</strong>, o usuário pode criar um novo user, com displayName, email, senha e image (url opcional). Ao fazer essa requisição, automaticamente é feito o login e retornado um token para acesso a outos tipos de requisições.

2. Ao utilizá-lo com o método <strong>GET</strong>, pode-se escolher entre passar ou não um id no endpoint. Será retornada a informação do usuário desejado ou de todos os usuários, se optar por não passar id específico.

3. Para utilizá-lo com o método <strong>delete</strong>, deve-se acrescentar no endpoint o termo `/me`, caso queira deletar sua conta como usuário.

# endpoint `/categories` <>
1.  Ao utilizá-lo com o método <strong>POST</strong>, pode-se criar uma nova categoria para ser adicionada em um post do blog.

2. Ao utilizá-lo com o método <strong>GET</strong>, pode-se ter acesso a todas as categorias existentes no banco de dados.

# endpoint `/post` <>
1. Ao utilizá-lo com o método <strong>POST</strong>, pode-se criar um novo post, com título (title) e conteúdo (content).

2. Ao utilizá-lo com o método <strong>GET</strong>, pode-se ter acesso a todas os posts existentes no banco de dados. É possível também optar pelo uso um id, no caso de se desejar apenas um post específico, ou ainda usar uma query para buscar um post por meio do título ou do conteúdo de um post por meio da extensão do endpoint `/search?q`.

3. Caso desejar, pode-se modificar um post já existente com o método <strong>PUT</strong>.

4. Em última instância, caso desejar, pode-se deletar um post por meio do método <strong>DELETE</strong>.
