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
3. Symlink it to sites-enabled `sudo ln -s /etc/nginx/sites-available/namemyvar.com /etc/nginx/sites-enabled/namemyvar.com`
4. Reload NGINX to make the configuration take effect: `sudo systemctl reload nginx`

### Enable https ###
1. Complete steps 1-4 above
2. Add the certbot repo `sudo add-apt-repository ppa:certbot/certbot` (skip if using debian)
3. Install certbot `sudo apt update && sudo apt install python-certbot-nginx`
4. Ensure that the server_name line is included in your site config
5. Allow https traffic through your firewall
6. Run the command `sudo certbot --nginx -d example.com -d www.example.com` with your domain names after each `-d`
7. Follow the prompts

Instructions modified from https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04
