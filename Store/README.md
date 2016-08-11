# RESTfull Web API Documentation
#### Replace http://localhost:3000 with appropiate hosting location
## Usage 
#### This api has debug logging functionality, it will create a ./logs/logfile.log with logging information and display messages in the console. Logging and console messages only happen when global.DEBUG = true. this can be set in the server.js file. 
#### The logfile.log will contain three levels of messages: information, warnings, and errors. Example:
```
Log file Initialized on Thu Aug 11 2016 17:09:23 GMT-0400 (Eastern Daylight Time)
 - at: 5:23:49 PM information(blue): info message
 - at: 5:23:49 PM warning(yellow): warning message
 - at: 5:23:49 PM error(red): error message
 ```
#### See below for routes end points. When doing PUT and POST do not forget to add in the request header:
 ```
Content-Type: application/json
 ```
## Display All Applications Info including related entities
- GET Route: http://localhost:3000/api/v1/applications

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
				applicationId: 1
			},
			{
				...
			}
		]
	},
```
## Display All Users Info including related entities
- GET Route: http://localhost:3000/api/v1/users 

#### Response Data:
```javascript
[
	{
		id: 1,
		name: "maria",
		applications: 
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
]
```
## Display Single App Info including related entities
- GET Route: http://localhost:3000/api/v1/applications/1 (1 could be any id value)

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
			applicationId: 1
		},
		{
			...
		}
	]
}
```
## Display Single User Info including related entities
- GET Route: http://localhost:3000/api/v1/users/1 (1 could be any id value)

#### Response Data:
```javascript
{
	id: 1,
	name: "maria",
	applications: 
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
## Update Application Info 
- PUT Route: http://localhost:3000/api/v1/applications/1 (1 could be any id value)

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
## Update User Info 
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
## Insert new Application 
- POST Route: http://localhost:3000/api/v1/applications 
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
## Insert New User  
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
## Delete Application 
- DELETE Route: http://localhost:3000/api/v1/applications/1 (1 could be any id value)

#### Response Data:
```javascript
[301,null,null]
```
## Delete User  
- DELETE Route: http://localhost:3000/api/v1/users/1

#### Response Data:
```javascript
[301,null,null]
```