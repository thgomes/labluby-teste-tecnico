# labluby-teste-tecnico
Neste repositório estão contidos os testes técnicos solicitados pela Luby. O primeiro teste é uma API desenvolvida em Node.js, utilizando Express e Sequelize. O Segundo teste visa medir o raciocínio lógico através da implementação de determinados algoritmos.


## 🚀 Instalação e execução da API

**Primeiramente instale o [Node.js](https://nodejs.org/en/download/) e o [Yarn](https://yarnpkg.com/), em seguida, clone o projeto rodando este comando:**

```git clone https://github.com/thgomes/netrecipes-web.git```

**Instalação das dependências**

Rode o seguinte comando no terminal para que as dependências sejam instalad

```yarn install```

**Variáveis de ambiente**

Vá até o arquivo '.env.example' e prencha todos os campos de acordo com as configurações da base de dados e demais tópicos nele especificados. Após preenche-lo, altere o nome do arquivo para '.env'.

**Configuração da base de dados**

Rode o seguinte comando no terminal para que as tabelas sejam formadas na sua base de dados

```yarn sequelize db:migrate```

**Execução**

Rode o seguinte comando para iniciar o servidor em modo de desenvolvimento

```yarn start```
