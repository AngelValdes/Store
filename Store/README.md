# Store
# end points:
# GET /api/v1/apps -> Display All Apps Info
# GET /api/v1/users -> Display All Users Info
# GET /api/v1/apps/:id -> Display Single App Info
# GET /api/v1/users/:id -> Display Single User Info

# example return data from endpoints

# user example data 
{
  "id": 1,
  "name": "Maria",
}
# application example data
{
  "id": 1,
  "title": "Best App Ever",
  "description": "A fast paced side scrolling shooter",
  "artAssets": [
    { "title": "Splash Screen", "srcLink": "http://i.imgur.com/5e5Ihb6.jpg" },
    { "title": "Cut Scene", "srcLink": "http://i.imgur.com/QQ3O6PO.jpg" }
  ],
  "releaseDate": "2016-06-15T22:29:20.000Z",
  "createdAt": "2016-05-15T22:29:20.000Z",
  "updatedAt": "2016-05-15T22:29:20.000Z",
  "user": {
    "id": "ae25e5a4-73db-4969-9f6c-acf8246b7faa",
    "name": "Chapman"
  }
}
