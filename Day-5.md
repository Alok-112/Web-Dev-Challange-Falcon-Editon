### Day 5 - Building a Complete Backend

### Tasks
- Preparing node project for backend
- Add prettier and git to the code base
- Auto restart your server
- Dot env files on backend


### Vid 108. Preparing node project for backend
- setup a node project by this command `npm init`
- make a index.js file 
- By default the type in `package.json` will be `commonjs` but we need to change it to `module` because we will be using modules 
```js

```
### Vid 109. Add prettier and git to the code base

- Prettier :- An Opionionated Code Formatter which supports lot of languages 
- Prettier Docs([Docs](https://prettier.io/docs/install))

### Vid 110. Auto restart your server

- constant refresh of our project (its a problem)
- `nodemon` and `node --watch` are two modules that will help
- so we will save this modules as dev dependency 

### Vid 111. Dot env files on backend

- `dotenv` used to store environment variables
- `.gitignore` file is made to exclude things like `node_modules` and `env`
- 
```js
import dotenv from 'dotenv'
dotenv.config({
    path:"./env",
});
```