
# Micro service && RabbitMQ

Cet exemple a pour but de montrer le fonctionnement de 2 microservices qui communique avec 
RabbitMQ.





## Objectif

- Mettre en place une structure MVC sur nodeJS.
- Connection a mongoDB.
- Lancer RabbitMQ avec Kubernetes
- Connection a RabbitMQ.
- Consumer des donner d'un service à un notre avec RabbitMQ.
- Utilisation de Dockefile


## Installation
GIT
```bash
  git clone https://github.com/WJarod/NodeJS_Microservice.git
```

User_Service
```bash
  cd User_Service
  npm i 
```

Archive_Service
```bash
  cd Archive_Service
  npm i 
```

## Lancer

User_Service // Archive_Service
Mac
```bash
  npm start 
```
Windows
```bash
  npm run w-start 
```


## Faire les tests
- Poster un utilisateur sur le service user 
  ![post](https://i.ibb.co/Sff2VvP/Capture-d-e-cran-2022-10-27-a-22-54-45.png)
- Supprimer un utilisateur du service user 
  ![delete](https://i.ibb.co/7W1xhjB/Capture-d-e-cran-2022-10-27-a-22-54-58.png)
- Get les utilisateurs du service archives 
  ![get](https://i.ibb.co/MVJJyk0/Capture-d-e-cran-2022-10-27-a-22-55-16.png)
- Le fonctionement
  ![get](https://i.ibb.co/PYHpKJv/delete-methode.png)

## Mettre en place un Dockerfile, créer une image et lancer une image

Exemple d'un Dockerfile
```bash
FROM node:16
ENV NODE_ENV=prod

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 2000
CMD [ "node", "App.js" ]
```

- 1 Créer l'image pour docker
  - Exemple /!\ ne pas mettre de maj
  ```bash
    docker build -t <docker_id>/<service_name>-service .
  ```
  - Resultat pour notre service user
  ```bash
    docker build -t wjarod/user-service .
  ```
- 2 Lancer une image 
  - Exemple /!\ ne pas mettre de maj
  ```bash
    docker run -p <docker_port>:<nodejs_port> -d <docker_id>/<service_name-service
  ```
  - Resultat pour notre service user
  ```bash
    docker run -p 10100:1000 -d wjarod/user-service
  ```
- Resultat 
  - On peut maintenant get sur le port de docker car notre serveur nodejs et lancer sur docker
  ![docker_get](https://i.ibb.co/qMzrTVB/Capture-d-e-cran-2022-10-27-a-23-29-27.png)