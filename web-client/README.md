# Web Client

## Ubuntu 16.04 Install Notes

```bash
# Install Node 8
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn

# Install Yarn packages
yarn install
```

## Build

```bash
yarn run gulp
```

Output will be in `web-client/dist`.
