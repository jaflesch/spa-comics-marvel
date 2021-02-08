# SoftDesign React Challenge

> O objetivo do desafio consiste em utilizar uma API da Marvel para consulta de quadrinhos. É possível também selecionar HQs de interesse e enviar um resumo destas para o e-mail de um usuário.

Página no GitHub Pages [SPA Comics Marvel](https://jaflesch.github.io/spa-comics-marvel/).

## Tecnologias utilizadas

- React (17.0.1)
- HTML5
- CSS3
- SASS

## Envio de e-mail

Para a realização da tarefa solicitada, foi adotada a seguinte solução: criação de uma conta na plataforma [EmailJS](https://www.emailjs.com/). Ela permite a configuração de serviços e templates de e-mail de forma a abstrair a necessidade de utilização de um servidor *backend* para o disparo de e-mails a partir da aplicação.

Esta estratégia foi utilizada a fim de minimizar a quantidade de processos de instalação e configuração durante a avaliação desta submissão.

> **Atenção**: a plataforma possui um limite diário para envio de 200 e-mails.

## Desenvolvimento e homologação

Todo o projeto foi desenvolvimento e homologado nos navegadores Google Chrome e Mozilla Firefox. Demais navegadores não foram homologados e, portanto, podem apresentar comportamento inesperado, especialmente com regras específicas de folha de estilos.

## Montar o projeto localmente

Clone este repositório e execute os seguinte comandos:
```bash 
$ npm install
```
```bash
$ npm start
```

O Node.js instalará todas as configurações necessárias para a aplicação iniciar localmente em modo de desenvolvimento. Basta abrir o endereço [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.
