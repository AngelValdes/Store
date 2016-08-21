# RESTfull Web API in Node JS
### All javascript files compliant with:
- [AirBnB Javascript Style Guide] (https://github.com/airbnb/javascript)
- [ESLint] (http://eslint.org/)

### Included testing files written with [Mocha] (https://mochajs.org/) and [Faker] (https://github.com/FotoVerite/Faker.js)

### No IDE dependencies, you can open in any IDE. In VS, open as web site or make a new nodeJS project and add these existing files and folders.

#### Note: Replace http://localhost:3000 with appropiate hosting location
## Usage 
#### Create a .env file inside root of "store" folder with the following values according to your database server:
```
DB_NAME=store
DB_USER=root
DB_PASS=
DB_HOST=localhost
DB_SCHEMA=mysql
DB_PORT=3306 
```
#### Also make sure you create the database/user/password before running the app. ORM will create the tables and relations automatically in the database.
## Workflow 
#### To add a new feature:  
1. Create a new branch, add your code and check in
2. Merge into master
3. Tag it and merge it to the release-staging branch  

## Deployment
#### To deploy the app to staging and production:
1. After checking in or merging into release-staging branch, all test will run automatically using codeship
2. If all test pass, Heroku will be notified and publishing to staging will happen automatically.
3. After testing staging, publish to production manually by going into Heroku and clicking on Promote to production button in the staging app. 
#### Also make sure you create the database/user/password before running the app. ORM will create the tables and relations automatically in the database.   

#### When doing PUT and POST do not forget to add in the request header:
 ```
Content-Type: application/json
 ```
#### Unit Testing is written to test 100% of code functionality and routes. there are static and dynamic routes unit testing. To test open a console command window at the project scope and type "mocha" and press enter. you should see all unit test run and passing.

#### See below for routes end points. 
## Display all apps info including related entities
- GET Route: http://localhost:3000/api/v1/apps

#### Response Data:
```javascript
[
	{
		id: 1,
		title: "Best App Ever",
		description: "A fast paced side scrolling shooter",
		releaseDate: "2016-06-15T00:00:00.000Z",
		createdAt: "2016-08-09T18:35:15.000Z",
		updatedAt: "2016-08-09T18:35:15.000Z",
		userId: 1,
		user: {
				id: 1,
				name: "maria"
			},
		artAssets: [
			{
				id: 1,
				title: "Splash Screen",
				srcLink: "http://i.imgur.com/5e5Ihb6.jpg",
				appId: 1
			},
			{
				...
			}
		]
	},
	{ 
		... 
	}
	...
]
```
## Display all app info including related entities for a userId
- GET Route: http://localhost:3000/api/v1/users/1/apps

#### Response Data:
```javascript
[
	{
		id: 1,
		title: "Best App Ever",
		description: "A fast paced side scrolling shooter",
		releaseDate: "2016-06-15T00:00:00.000Z",
		createdAt: "2016-08-09T18:35:15.000Z",
		updatedAt: "2016-08-09T18:35:15.000Z",
		userId: 1,
		user: {
				id: 1,
				name: "maria"
			},
		artAssets: [
			{
				id: 1,
				title: "Splash Screen",
				srcLink: "http://i.imgur.com/5e5Ihb6.jpg",
				appId: 1
			},
			{
				...
			}
		]
	},
	{ 
		... 
	}
	...
]
```
## Display all users info including related entities
- GET Route: http://localhost:3000/api/v1/users 

#### Response Data:
```javascript
[
	{
		id: 1,
		name: "maria",
		apps: 
			[
				{
					id: 1,
					title: "Best App Ever",
					description: "A fast paced side scrolling shooter",
					releaseDate: "2016-06-15T00:00:00.000Z",
					createdAt: "2016-08-09T18:35:15.000Z",
					updatedAt: "2016-08-09T18:35:15.000Z",
					userId: 1
				},
				{
					...
				}
			]
	},
	{
		...
	}
	...
]
```
## Display single app info including related entities
- GET Route: http://localhost:3000/api/v1/apps/1 (1 could be any id value)

#### Response Data:
```javascript
{
	id: 1,
	title: "Best App Ever",
	description: "A fast paced side scrolling shooter",
	releaseDate: "2016-06-15T00:00:00.000Z",
	createdAt: "2016-08-09T18:35:15.000Z",
	updatedAt: "2016-08-09T18:35:15.000Z",
	userId: 1,
	user: {
			id: 1,
			name: "maria"
		},
	artAssets: [
		{
			id: 1,
			title: "Splash Screen",
			srcLink: "http://i.imgur.com/5e5Ihb6.jpg",
			appId: 1
		},
		{
			...
		}
	]
}
```
## Display single user info including related entities
- GET Route: http://localhost:3000/api/v1/users/1 (1 could be any id value)

#### Response Data:
```javascript
{
	id: 1,
	name: "maria",
	apps: 
		[
			{
				id: 1,
				title: "Best App Ever",
				description: "A fast paced side scrolling shooter",
				releaseDate: "2016-06-15T00:00:00.000Z",
				createdAt: "2016-08-09T18:35:15.000Z",
				updatedAt: "2016-08-09T18:35:15.000Z",
				userId: 1
			},
			{
				...
			}
		]
}
```
## Update app info 
- PUT Route: http://localhost:3000/api/v1/apps/1 (1 could be any id value)

#### Request Header: 
```
Content-Type: application/json
```

#### Request Body: 
```javascript
{"id":1,"title":"Best App Ever UPDATED","description":"A fast paced side scrolling shooter","releaseDate":"2016-06-15T00:00:00.000Z","userId":1}
```

#### Response Data:
```javascript
[
	301,
	{
		id: 1,
		title: "Best App Ever UPDATED",
		description: "A fast paced side scrolling shooter",
		releaseDate: "2016-06-15T00:00:00.000Z",
		createdAt: "2016-08-09T18:35:15.000Z",
		updatedAt: "2016-08-09T18:35:15.000Z",
		userId: 1
	},
	null
]

```
## Update user info 
- PUT Route: http://localhost:3000/api/v1/users/1 (1 could be any id value)

#### Request Header: 
```
Content-Type: application/json
```
#### Request Body: 
```javascript
{"id":1,"name":"maria UPDATED"}
```

#### Response Data:
```javascript
[
	301,
	{
		id: 1,
		name: "maria UPDATED"
	},
	null
]
```
## Insert new app 
- POST Route: http://localhost:3000/api/v1/apps 

#### Request Header: 
```
Content-Type: application/json
```
#### Request Body: 
```javascript
{"title":"Best App Ever NEW","description":"A fast paced side scrolling shooter","releaseDate":"2016-06-15T00:00:00.000Z","userId":1}
```

#### Response Data:
```javascript
[
	201,
	{
		id: 5, 
		title: "Best App Ever NEW",
		description: "A fast paced side scrolling shooter",
		releaseDate: "2016-06-15T00:00:00.000Z",
		createdAt: "2016-08-09T18:35:15.000Z",
		updatedAt: "2016-08-09T18:35:15.000Z",
		userId: 1
	},
	null
]
```
## Insert new user  
- POST Route: http://localhost:3000/api/v1/users

#### Request Header: 
```
Content-Type: application/json
```
#### Request Body: 
```javascript
{"name":"maria NEW"}
```

#### Response Data:
```javascript
[
	201,
	{
		name: "maria NEW"
	},
	null
]
```
## Delete app 
- DELETE Route: http://localhost:3000/api/v1/apps/1 (1 could be any id value)

#### Response Data:
```javascript
[200,"id: 3 deleted!",null]
```
## Delete user  
- DELETE Route: http://localhost:3000/api/v1/users/1

#### Response Data:
```javascript
[200,"id: 3  not found in database!",null]
```