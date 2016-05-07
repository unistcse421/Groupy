# Groupy

Facebook Group Search Helper


# Technology Stack
- Backend
 - Node.js v4.4.x
 - Express.js
 - MariaDB
- Frontend
 - Gulp
 - Requirejs
 - Angularjs
 - Semantic-UI

# How to setup
- <code>git clone https://github.com/unistcse421/Groupy.git</code>
- <code>npm install -g gulp bower</code>
- <code>npm install</code>
- <code>bower install</code>
- <code>gulp build</code> (Only for initial build and changes in semantic-ui)
- Write config.js file containing your DB properties and Facebook App Properties.
 - For DB properties, refer to [node-mariasql](https://github.com/mscdex/node-mariasql)
- <code>node bin/www</code>
- You need to apply changes in frontend code using one of these
 - <code>gulp watch</code> (Automatic build changes)
 - <code>gulp build-src</code> (Execute this command manually after writing changes)
