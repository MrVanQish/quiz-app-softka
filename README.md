# QuizAppSoftka

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.

The questions used in the application are extracted from an API called API Trivia that provides hundreds of questions as answers in JSON format with the necessary properties to fulfill the challenge. 

# Screenshots

![image](https://user-images.githubusercontent.com/11879883/134776782-203d3039-6c2b-4e00-ae83-680632054038.png)
![image](https://user-images.githubusercontent.com/11879883/134776787-5f340a62-5d0c-431a-921c-94aa55de9047.png)
![image](https://user-images.githubusercontent.com/11879883/134776796-5612471a-41c8-4e50-8352-4c14d51c0504.png)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Database

A db.json file located in the path quiz-app-softka\db.json was used to persist the data locally and this file works in conjunction with json-server.

[json-server documentation and npm install](https://www.npmjs.com/package/json-server)

## Getting Started

- You must first clone the project
  - git clone https://github.com/MrVanQish/quiz-app-softka.git

- then you must run the following command inside the project folder
  - npm install 
 
- then you must install json-server
  - npm i json-server
 
- After installing json-server, the only thing you have to do is to execute the command in a console inside the project
  - json-server --watch db.json 
  this will run the api-rest (Make sure that json-server runs in the following path http://localhost:3000)

- finally run the angular project like this
  - ng serve
 
- Enjoy  









