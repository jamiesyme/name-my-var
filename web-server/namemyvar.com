# Virtual Host configuration for namemyvar.com
#
server {
	listen 		80;

	root /var/www/namemyvar.com;
        index index.html;
}

