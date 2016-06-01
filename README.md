# Groupy

Facebook Group Search Helper


# Technology Stack
- Backend
 - Node.js v4.4.x
 - Express.js
 - MariaDB
- Frontend
 - Gulp
 - Webpack
 - Angularjs
 - Semantic-UI

# How to setup
- ```git clone https://github.com/unistcse421/Groupy.git```
- ```npm install -g gulp webpack```
- ```npm install```
- ```gulp build``` (Only for initial build and changes in semantic-ui)
- Write config.js file containing your DB properties and Facebook App Properties.
 - For DB properties, refer to [node-mariasql](https://github.com/mscdex/node-mariasql)
- ```node bin/www```
- You need to apply changes in frontend code using one of these
 - ```gulp watch``` (Automatic build changes)
 - ```gulp build-src``` (Execute this command manually after writing changes)
  
# Authors
- [Taehyun Kim](https://github.com/kimxogus)
- [Seunghoe Kim](https://github.com/ksh7534)  
- [Myeonggyun Han](https://github.com/L34p)   
