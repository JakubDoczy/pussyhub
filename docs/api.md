<!-- Generator: Widdershins v4.0.1 -->

<h1 id="pussyhub-api">PussyHub API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

testing auto generation

<h1 id="pussyhub-api-user">user</h1>

## get__users_auth

`GET /users/auth`

*Logs in an user*

> Body parameter

```json
{
  "email": "string",
  "password": "string"
}
```

<h3 id="get__users_auth-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» email|body|string|false|none|
|» password|body|string|false|none|

> Example responses

> 200 Response

```
"string"
```

<h3 id="get__users_auth-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns User JWT Token|string|

<aside class="success">
This operation does not require authentication
</aside>

## get__users_registration

`GET /users/registration`

*Registers an user*

> Body parameter

```json
{
  "email": "string",
  "username": "string",
  "password": "string",
  "description": "string",
  "picture_url": "string"
}
```

<h3 id="get__users_registration-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» email|body|string|false|none|
|» username|body|string|false|none|
|» password|body|string|false|none|
|» description|body|string|false|none|
|» picture_url|body|string|false|none|

> Example responses

> 200 Response

```
"string"
```

<h3 id="get__users_registration-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns User JWT Token|string|

<aside class="success">
This operation does not require authentication
</aside>

## get__users_{id}

`GET /users/{id}`

*Get User by Id*

<h3 id="get__users_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|ID of User|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "email": "string",
  "user_role": "admin",
  "username": "string",
  "description": "string",
  "picture_url": "string"
}
```

<h3 id="get__users_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Serialized user|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="pussyhub-api-video">video</h1>

## get__videos_{id}

`GET /videos/{id}`

*Gets video by Id*

<h3 id="get__videos_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|ID of Video|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "creator_id": 0,
  "name": "string",
  "preview_url": "string",
  "video_url": "string",
  "views": 0,
  "likes": 0,
  "dislikes": 0,
  "created_at": "string",
  "rating": {
    "user_id": 0,
    "rating": 0
  },
  "category": {
    "name": "string"
  }
}
```

<h3 id="get__videos_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Video JSON|[VideoWithId](#schemavideowithid)|

<aside class="success">
This operation does not require authentication
</aside>

## put__videos_{id}

`PUT /videos/{id}`

*Updates video by Id*

<h3 id="put__videos_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|ID of Video|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "creator_id": 0,
  "name": "string",
  "preview_url": "string",
  "video_url": "string",
  "views": 0,
  "likes": 0,
  "dislikes": 0,
  "created_at": "string",
  "rating": {
    "user_id": 0,
    "rating": 0
  },
  "category": {
    "name": "string"
  }
}
```

<h3 id="put__videos_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Updated Video JSON|[VideoWithId](#schemavideowithid)|

<aside class="success">
This operation does not require authentication
</aside>

## delete__videos_{id}

`DELETE /videos/{id}`

*Deletes video by Id*

<h3 id="delete__videos_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|ID of Video|

<h3 id="delete__videos_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__videos

`POST /videos`

*Creates new video*

> Body parameter

```json
{
  "creator_id": 0,
  "name": "string",
  "preview_url": "string",
  "video_url": "string",
  "views": 0,
  "likes": 0,
  "dislikes": 0,
  "created_at": "string",
  "rating": {
    "user_id": 0,
    "rating": 0
  },
  "category": {
    "name": "string"
  }
}
```

<h3 id="post__videos-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Video](#schemavideo)|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "creator_id": 0,
  "name": "string",
  "preview_url": "string",
  "video_url": "string",
  "views": 0,
  "likes": 0,
  "dislikes": 0,
  "created_at": "string",
  "rating": {
    "user_id": 0,
    "rating": 0
  },
  "category": {
    "name": "string"
  }
}
```

<h3 id="post__videos-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Video JSON|[VideoWithId](#schemavideowithid)|

<aside class="success">
This operation does not require authentication
</aside>

## get__videos

`GET /videos`

*List all videos*

<h3 id="get__videos-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Page number|

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "creator_id": 0,
    "name": "string",
    "preview_url": "string",
    "video_url": "string",
    "views": 0,
    "likes": 0,
    "dislikes": 0,
    "created_at": "string",
    "rating": {
      "user_id": 0,
      "rating": 0
    },
    "category": {
      "name": "string"
    }
  }
]
```

<h3 id="get__videos-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A JSON array of Videos|Inline|

<h3 id="get__videos-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[allOf]|false|none|none|

*allOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» id|integer|false|none|none|

*and*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Video](#schemavideo)|false|none|none|
|»» creator_id|integer|false|none|none|
|»» name|string|false|none|none|
|»» preview_url|string|false|none|none|
|»» video_url|string|false|none|none|
|»» views|integer|false|none|none|
|»» likes|integer|false|none|none|
|»» dislikes|integer|false|none|none|
|»» created_at|string|false|none|ISO 8061 date string|
|»» rating|[Rating](#schemarating)|false|none|none|
|»»» user_id|integer|false|none|none|
|»»» rating|integer|false|none|none|
|»» category|[Category](#schemacategory)|false|none|none|
|»»» name|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## get__categories_{id}_videos

`GET /categories/{id}/videos`

*Gets videos in given category*

<h3 id="get__categories_{id}_videos-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|Page number|

> Example responses

> 200 Response

```json
[
  {
    "creator_id": 0,
    "name": "string",
    "preview_url": "string",
    "video_url": "string",
    "views": 0,
    "likes": 0,
    "dislikes": 0,
    "created_at": "string",
    "rating": {
      "user_id": 0,
      "rating": 0
    },
    "category": {
      "name": "string"
    }
  }
]
```

<h3 id="get__categories_{id}_videos-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A JSON array of Videos|Inline|

<h3 id="get__categories_{id}_videos-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Video](#schemavideo)]|false|none|none|
|» creator_id|integer|false|none|none|
|» name|string|false|none|none|
|» preview_url|string|false|none|none|
|» video_url|string|false|none|none|
|» views|integer|false|none|none|
|» likes|integer|false|none|none|
|» dislikes|integer|false|none|none|
|» created_at|string|false|none|ISO 8061 date string|
|» rating|[Rating](#schemarating)|false|none|none|
|»» user_id|integer|false|none|none|
|»» rating|integer|false|none|none|
|» category|[Category](#schemacategory)|false|none|none|
|»» name|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="pussyhub-api-category">category</h1>

## get__categories_{id}

`GET /categories/{id}`

*Gets category by Id*

<h3 id="get__categories_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|ID of Category|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string"
}
```

<h3 id="get__categories_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Category JSON|[CategoryWithId](#schemacategorywithid)|

<aside class="success">
This operation does not require authentication
</aside>

## put__categories_{id}

`PUT /categories/{id}`

*Updates category by Id*

<h3 id="put__categories_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|ID of Category|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string"
}
```

<h3 id="put__categories_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Updated Category JSON|[CategoryWithId](#schemacategorywithid)|

<aside class="success">
This operation does not require authentication
</aside>

## delete__categories_{id}

`DELETE /categories/{id}`

*Deletes category by Id*

<h3 id="delete__categories_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|ID of Category|

<h3 id="delete__categories_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__categories

`POST /categories`

*Creates new category*

> Body parameter

```json
{
  "name": "string"
}
```

<h3 id="post__categories-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Category](#schemacategory)|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string"
}
```

<h3 id="post__categories-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A JSON of Category|[CategoryWithId](#schemacategorywithid)|

<aside class="success">
This operation does not require authentication
</aside>

## get__categories

`GET /categories`

*List all categories*

> Example responses

> 200 Response

```json
[
  {
    "name": "string"
  }
]
```

<h3 id="get__categories-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A JSON array of Categories|Inline|

<h3 id="get__categories-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Category](#schemacategory)]|false|none|none|
|» name|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="pussyhub-api-rating">rating</h1>

## post__videos_{id}_like

`POST /videos/{id}/like`

*Gives video like*

<h3 id="post__videos_{id}_like-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|ID of Video|

<h3 id="post__videos_{id}_like-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## post__videos_{id}_dislike

`POST /videos/{id}/dislike`

*Gives video dislike*

<h3 id="post__videos_{id}_dislike-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|ID of Video|

<h3 id="post__videos_{id}_dislike-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_ROLE">ROLE</h2>
<!-- backwards compatibility -->
<a id="schemarole"></a>
<a id="schema_ROLE"></a>
<a id="tocSrole"></a>
<a id="tocsrole"></a>

```json
"admin"

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|admin|
|*anonymous*|user|

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": 0,
  "email": "string",
  "user_role": "admin",
  "username": "string",
  "description": "string",
  "picture_url": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|email|string|false|none|none|
|user_role|[ROLE](#schemarole)|false|none|none|
|username|string|false|none|none|
|description|string|false|none|none|
|picture_url|string|false|none|none|

<h2 id="tocS_Video">Video</h2>
<!-- backwards compatibility -->
<a id="schemavideo"></a>
<a id="schema_Video"></a>
<a id="tocSvideo"></a>
<a id="tocsvideo"></a>

```json
{
  "creator_id": 0,
  "name": "string",
  "preview_url": "string",
  "video_url": "string",
  "views": 0,
  "likes": 0,
  "dislikes": 0,
  "created_at": "string",
  "rating": {
    "user_id": 0,
    "rating": 0
  },
  "category": {
    "name": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|creator_id|integer|false|none|none|
|name|string|false|none|none|
|preview_url|string|false|none|none|
|video_url|string|false|none|none|
|views|integer|false|none|none|
|likes|integer|false|none|none|
|dislikes|integer|false|none|none|
|created_at|string|false|none|ISO 8061 date string|
|rating|[Rating](#schemarating)|false|none|none|
|category|[Category](#schemacategory)|false|none|none|

<h2 id="tocS_VideoWithId">VideoWithId</h2>
<!-- backwards compatibility -->
<a id="schemavideowithid"></a>
<a id="schema_VideoWithId"></a>
<a id="tocSvideowithid"></a>
<a id="tocsvideowithid"></a>

```json
{
  "id": 0,
  "creator_id": 0,
  "name": "string",
  "preview_url": "string",
  "video_url": "string",
  "views": 0,
  "likes": 0,
  "dislikes": 0,
  "created_at": "string",
  "rating": {
    "user_id": 0,
    "rating": 0
  },
  "category": {
    "name": "string"
  }
}

```

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» id|integer|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Video](#schemavideo)|false|none|none|

<h2 id="tocS_Category">Category</h2>
<!-- backwards compatibility -->
<a id="schemacategory"></a>
<a id="schema_Category"></a>
<a id="tocScategory"></a>
<a id="tocscategory"></a>

```json
{
  "name": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|

<h2 id="tocS_CategoryWithId">CategoryWithId</h2>
<!-- backwards compatibility -->
<a id="schemacategorywithid"></a>
<a id="schema_CategoryWithId"></a>
<a id="tocScategorywithid"></a>
<a id="tocscategorywithid"></a>

```json
{
  "id": 0,
  "name": "string"
}

```

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» id|integer|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Category](#schemacategory)|false|none|none|

<h2 id="tocS_Rating">Rating</h2>
<!-- backwards compatibility -->
<a id="schemarating"></a>
<a id="schema_Rating"></a>
<a id="tocSrating"></a>
<a id="tocsrating"></a>

```json
{
  "user_id": 0,
  "rating": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user_id|integer|false|none|none|
|rating|integer|false|none|none|

