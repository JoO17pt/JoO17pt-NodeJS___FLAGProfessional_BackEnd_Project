# Projeto Backend | FLAGProfessional Full-Stack Web Developer

## Resumo do projeto
O presente projeto (base de dados + backend + frontend) apresenta uma proposta de plataforma onde os utilizadores podem expor os seus bens sem utilidade, de modo a encontrar um destino adequado para os mesmos, através de troca direta com bens de outros utilizadores. A aplicação dispõe de um sistema de pesquisa que permite aplicar cumulativamente os critérios categoria de produto, palavra / expressão chave e próximidade dos utilizadores. Mediante interesse de um utilizador em efetuar uma troca, é disponibilizado um canal direito de mensagens com o owner do bem desejado, de modo a permitir avaliar a viabilidade do negócio ou acertar os detalhes do mesmo. Após aceitação do negócio por ambas as partes é disponibilizada a cada utilizador a possibilidade de avaliar o processo, impactando o rating geral de cada utilizador, dando assim visibilidade a toda a comunidade da apreciação geral dos utilizadores. 

## Descrição das principais funcionalidades

### Utilizador
O registo dos utilizadores é realizado via email, sendo solicitado um nome / user, localização (morada completa / localidade / código postal) e fotografia (opcional). Após o registo, o utilizador fica habilitado a fazer upload dos seus produtos, e criar propostas de deals com os demais utilizadores. O utilizador tem ainda acesso ao seu rating, número de deals concretizados e número de produtos ativos a cada momento.

### Produto
Cada utilizador pode ter ilimitados produtos. Cada produto pode estar ativo (disponível para deal) ou inativo. O utilizador pode a cada momento inativar os produtos que carregou, sendo os mesmos também inativados automaticamente sempre que um deal que os inclua seja fechado. Na view de pesquisa os utilizadores conseguem ver todos os produtos ativos a cada momento, podendo pesquisar por nome de produto, categoria, ou próximidade ao owner (geolocalização).

### Deal
A partir da view de pesquisa de produtos, o utilizador pode aceder à view de criação de deal com o owner de cada produto apresentado. Nessa view são apresentados todos os produtos ativos de cada utilizador, podendo o mesmo construir o deal com o número de produtos que desejar provenientes de cada uma das partes (mínimo de 1 para 1). Mediante submissão, do deal passar para a view de deals enviados no utilizador de origem, e de deals recebidos no utilizador de destino. A partir deste momento o deal pode ser cancelado pelo utilizador de origem ou pelo utilizador de destino, passando assim para a view de deals cancelados em ambos, ou aceite pelo utilizador de destino, passando assim para o view de deals fechados em ambos. A partir deste momento (submissão do deal) fica também disponível para os dois utilizadores um canal de comunicação direta via mensagens, onde podem ser acertados os promenores da transação. Esta view possui todo o histórico de mensagens trocadas pelos dois utilizadores, neste deal ou em anteriores. O canal continua aberto mesmo após o deal ser aceite pelo utilizador de destino, possibilitando aos utilizadores acertarem os procedimentos subsequentes, como a troca dos produtos. Uma vez fechado, os utilizadores têm então a possibilidade de avaliar a interação com o outro utilizador, através da atribuição de uma pontuação de 1 a 5 valores. Na view de pesquisas é apresentado o rating de cada utilizador, calculado através da média dos ratings recebidos em cada deal fechado.

## Descrição da estrutura de dados

A plataforma está construida sobre uma base de dados relacional (MySQL), que possui as tabelas "users", "products" e "deals" como centrais, e várias outras periféricas. 

### Tabela "users"
A tabela "users" possuí relação de um para muitos com a tabela "products", e muitos para muitos com a tabela "deals". Adicionalmente, possuí também relação de muitos para muitos com a tabela períférica "messages".

### Tabela "products"
A tabela "products" possuí relação de muitos para um com a tabela "users", e muitos para muitos com a tabela "deals". Adicionalemente, possuí também relação de muitos para um com a tabela "categories".

### Tabela "deals"
A tabela "deals" possuí relação de muitos para muitos com as tabelas "users" e "products".