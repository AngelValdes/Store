# Web API End Points Documentation
#### Replace http://localhost:3000 with appropiate hosting location
## Display All Applications Info including related entities
- GET Route: http://localhost:3000/api/v1/applications
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
```
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
```
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
```
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