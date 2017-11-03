# API Server

## Using the API

There is a single endpoint at `GET /search` accepting the `q` parameter, which is the search term. The search term can be in TitleCase, camelCase, underscore_case, and kebab-case, and can contain numbers and symbols; it will be normalized, and returned as part of the response.

There are three kinds of result terms, which differ only by `type`. `type` can be one of: `variable`, `function`, or `class`.

A usage example is given below.

```
GET /search?q=i
```

```json
{
  "resultTerms": [
    {
      "alternatives": [
        "index"
      ],
      "commonUses": [
        "loop counter",
        "array index"
      ],
      "examples": [
        {
          "label": "zero_copy_stream_unittest.cc",
          "project": "google/protobuf",
          "url": "https://github.com/google/protobuf/blob/fa5a69e73b0dd667ff15062adbc170310d440ee9/src/google/protobuf/io/zero_copy_stream_unittest.cc#L287"
        },
        {
          "label": "model.cc",
          "project": "facebookresearch/fastText",
          "url": "https://github.com/facebookresearch/fastText/blob/f10ec1faea1605d40fdb79fe472cc2204f3d584c/src/model.cc#L331"
        }
      ],
      "name": "i",
      "relatedTerms": [
        "j",
        "k",
        "x"
      ],
      "specificity": -1,
      "type": "variable"
    }
  ],
  "searchTerm": "i"
}
```

## Ubuntu 16.04 Setup Notes

```bash
# Install Node 8
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs

# Install Yarn
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
$ sudo apt-get update && sudo apt-get install yarn

# Install Yarn packages
$ yarn install
```

## Run

To run the api server:

```bash
$ yarn start
```

## Config

Environment variables:

```bash
# DB_FILENAME is the location of the json test data, relative to `server.js`.
# Note: ./ prefix is important.
# Default:
DB_FILENAME='./test-data.json'
```
