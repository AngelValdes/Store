# RESTfull Web API in Node JS
### No IDE dependencies, you can open in any IDE.

#### Note: Replace http://localhost:3000 with appropiate hosting location

#### See below for routes end points. 
## Display all apps info 
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

## Display all users info 
- GET Route: http://localhost:3000/api/v1/users 

#### Response Data:
```javascript
[
	{
		id: 1,
		name: "maria",		
	},
	{
		...
	}
	...
]
```
## Display single app info 
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
## Display single user info 
- GET Route: http://localhost:3000/api/v1/users/1 (1 could be any id value)

#### Response Data:
```javascript
{
	id: 1,
	name: "maria
}
```
