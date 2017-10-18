# Web Client

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

## Build

To build the web client once:

```bash
$ yarn run gulp build-client
```

To watch the files and build the web client whenever a file changes:

```bash
$ yarn run gulp
# or
$ yarn run gulp watch
```

The build output will be in `web-client/dist`.
