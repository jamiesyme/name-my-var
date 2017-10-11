# NGINX Configuration

## Getting Started

Make sure you have either Ubuntu or Debian installed on your VM or server.

### Prerequisites

In order to use this configuration file you will need to have NGINX installed. To do this, use the following command:

```
sudo apt install nginx
```

### Using the Config File

1. Download the config file: `namemyvar.com`
2. Move it to the directory: `/etc/nginx/sites-available/`
3. Symlink it to sites-enabled

 `sudo ln -s /etc/nginx/sites-available/namemyvar.com /etc/nginx/sites-enabled/namemyvar.com`
4. Reload NGINX to make the configuration take effect: `sudo systemctl reload nginx`
