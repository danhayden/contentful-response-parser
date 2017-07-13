# Contentful Response Parser

[![version][version]](http://npm.im/contentful-response-parser)
[![MIT License][MIT License]](http://opensource.org/licenses/MIT)
[![Standard][Standard]](http://standardjs.com)
[![Standard Version][Standard Version]](https://github.com/conventional-changelog/standard-version)
[![Size][Size]](https://unpkg.com/contentful-response-parser)

This module will parse the Contentful HTTP API response and resolve all nested Asset and Entry links for easier to work with data

## Usage

```js
import axios from 'axios'
import { generateItemObject, generateItemObjectArray } from 'contentful-response-parser'

const spaceId = 'xxxxxx'
const accessToken = 'xxxxxx'

const contenfulAPI = axios.create({
  method: 'get',
  baseURL: `https://cdn.contentful.com/spaces/${spaceId}/entries`,
  headers: { Authorization: `Bearer ${accessToken}` }
})

export const getAllBlogPosts = () => {
  const params = { content_type: 'blogPost', include: 10 }
  return contenfulAPI.get('/', {params})
    .then(response => response.data)
    .then(generateItemObjectArray)
}

export const getBlogPost = (postSlug) => {
  const params = { content_type: 'blogPost', include: 10, 'fields.slug': postSlug }
  return contenfulAPI.get('/', {params})
    .then(response => response.data)
    .then(generateItemObject)
}
```

### Limitations

Currently this library does not support deep nested entries (PRs welcome!)

### License

MIT

[version]: https://img.shields.io/npm/v/contentful-response-parser.svg
[MIT License]: https://img.shields.io/npm/l/contentful-response-parser.svg
[Standard]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[Standard Version]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg
[Size]: https://badges.herokuapp.com/size/npm/contentful-response-parser?gzip=true&label=gzipped
