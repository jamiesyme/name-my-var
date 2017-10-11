# Virtual Host configuration for namemyvar.com
#
server {
        listen          80;
        server_name     namemyvar.com www.namemyvar.com;

        return          301 https://$server_name$request_uri;


}

server {
        listen 443 ssl;
        server_name     namemyvar.com www.namemyvar.com;

        root /var/www/namemyvar.com;
        index index.html;
}
