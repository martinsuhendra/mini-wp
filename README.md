# mini-wp

## Usage
```javascript
$ npm install
$ node app.js
```
Access server via `http://localhost:3000`<br>
Access client via `http://localhost:8080`
##  Routes
|Routes|HTTP|Header(s)|Body|Response|Description| 
|:--:|:--:|:--:|:--:|:--:|:--:|
|/users/register  |POST  |none|email: String (**required**),  password: String (**required**)|**Success**: Register a user, **Error**: Internal server error (Validation)|Register a user|
|/users/login  |POST  |none|email: String (**required**), password: String (**required**) |**Success**: Login as a user, **Error**: Internal server error (Validation)|Login as a user|
|/users/googleSignIn  |POST  |none|email: String (**required**), password: String (**required**) |**Success**: Login as a user via Google, **Error**: Internal server error (Validation)|Login as a user via Google|
|/articles  |GET  |token|none |**Success**: Get all posted articles, **Error**: Internal server error (Validation)|Get all user's posted articles|
|/articles  |POST  |token|title: String (**required**), content: String (**required**), image: File (**optional**) |**Success**: Create an article, **Error**: Internal server error (Validation)|Create an article|
|/articles /:id |GET |token  |none |**Success**: Show user posted articles, **Error**: Internal server error| Get user posted articles|
|/articles/:userId/:articleId  | GET |token |none |**Success**: show details of article, **Error**: Internal server error| Show details of one article|
|/articles/:articleId  |PUT  |token|title: String (**optional**), content: String (**optional**), image: File (**optional**) |**Success**: Update an article, **Error**: Internal server error (Validation)|Update an article|
|/articles/:articleId  |DELETE  |token|none|**Success**: Delete an article, **Error**: Internal server error (Validation)|Delete an article|