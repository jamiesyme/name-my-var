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
$ echo 'PATH="$HOME/.yarn/bin:$PATH" >> "$HOME/.profile"

# Install Yarn packages
$ yarn install

# Install gulp
$ yarn global add gulp-cli
```

## Build

To build the web client once:

```bash
$ gulp
# or
$ gulp --production
```

To watch the files and build the web client whenever a file changes:

```bash
$ gulp watch
```

The build output will be in `web-client/dist`.
