# todolist API

### Installation guide

1. clone this to your local machines
2. Install [Docker](https://www.docker.com/)
3. go to the repository
4. run command `docker-compose build` to build docker container
5. run command `docker-compose up` to start API server in docker container
5. On your browser `http://localhost:3001`

### How to run unit test

Firstly, Install [Mongodb](https://www.mongodb.com/) then 

In the repository run command

1. run command `npm install`
2. run command `mongod`
3. run command `npm run test`

### API Guide
> **`GET  /todo`** return all tasks list

Key | Value
------------ | -------------
id | ObjectId(required)
```javascript
[
  {
    title: String,
    created: Date,
    updated: Date,
    status: String,
    content: String
  }
]
```


> **`GET  /todo/task?id=""`** return single task by id

Key | Value
------------ | -------------
id | ObjectId(required)
```javascript
{
  title: String,
  created: Date,
  updated: Date,
  status: String,
  content: String
}
```


> **`POST  /todo/add/task?title=""&content=""`** add task

Key | Value 
------------ | -------------
title | String(required)
content | String(required)
```javascript
{
  title: String,
  created: Date,
  updated: Date,
  status: String,
  content: String
}
```


> **`POST  /todo/edit/task?id=""&title=""&content=""`** edit task

Key | Value 
------------ | -------------
id | ObjectId(required)
title | String
content | String
```javascript
{
  status: 200
  Edit successfully
}
```


> **`POST  /todo/set/task?id=""&status=""`** set task status 

Key | Value 
------------ | -------------
id | ObjectId (required)
status | String(required) ['pending', 'done', 'cancel']

```javascript
{
  status: 200
  Update task status successfully
}
```



> **`POST  /todo/delete/task?id=""`** delete task 

Key | Value 
------------ | -------------
id | ObjectId(required)

```javascript
{
  status: 200
  Delete task successfully
}
```
