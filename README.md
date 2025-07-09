# Trabalho de Redes Multimídia e QoS
# 🐉 Comunicação Dracônica com SIP

Este projeto implementa um sistema de chamadas de voz entre "dragões", simulando um cenário onde criaturas em diferentes picos montanhosos se comunicam via protocolo SIP. Ele utiliza **Asterisk** como servidor SIP e uma aplicação **React com SIP.js** como cliente de chamadas.

---


Alunos:
- Geferson Artuzo 

- Arthur Afonso

- Júlio Cesar Leme

---

## Tecnologias Utilizadas

- [Asterisk](https://www.asterisk.org/) (Servidor SIP)
- [Docker Compose](https://docs.docker.com/compose/)
- [React](https://reactjs.org/)
- [SIP.js](https://sipjs.com/) (Cliente SIP via WebSocket)

---

## Estrutura de Pastas

```
comunicacao-draconica/
├── backend/
│   ├── docker-compose.yml
│   └── asterisk/
│       ├── pjsip.conf
│       ├── extensions.conf
│       └── http.conf
├── frontend/
│   ├── package.json
│   └── src/
│       ├── App.js
│       └── DragonSIP.js
└── README.md
```

---

## Pré-requisitos

- Docker Desktop instalado e em execução.
- Node.js (v18 ou superior) e npm instalados.
---

##  Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/comunicacao-draconica.git
cd comunicacao-draconica
```

---

### 2. Inicie o servidor SIP com Asterisk (Docker)

```bash
cd backend
docker-compose up
```

Isso irá iniciar o Asterisk com as configurações necessárias para registrar os usuários SIP `dragon1` e `dragon2`.

---

### 3. Inicie o front-end React

```bash
cd ../frontend
npm install
npm start
```

A aplicação abrirá automaticamente no navegador em:  
[http://localhost:3000](http://localhost:3000)

---

## Como usar

- O app inicia com o dragão `dragon1` registrado.
- Clique no botão **"Ligar para dragon2"**.
- Em outro navegador ou aba, use o app com `dragon2` para receber a chamada.
- Ao receber uma chamada, o dragão pode **aceitar ou rejeitar**.

---

## Contas SIP configuradas

| Dragão   | Usuário   | Senha | Extensão | Transporte |
|----------|-----------|--------|----------|------------|
| Dragão 1 | `dragon1` | `1234` | 1001     | WS        |
| Dragão 2 | `dragon2` | `1234` | 1002     | WS        |

---

##  Observações

- Certifique-se de que o **Docker Desktop esteja em execução** antes de subir o Asterisk.
- Se estiver usando self-signed certificate (TLS), seu navegador pode bloquear o WebSocket. Nesse caso, aceite o certificado manualmente ou use `ws://` temporariamente.

---

