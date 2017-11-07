# Virtual Host configuration for namemyvar.com
#
server {	
	listen 80;

	server_name namemyvar.com www.namemyvar.com

	root /var/www/namemyvar.com;
        index index.html;

	listen 443 ssl; # managed by Certbot
	
	root /var/www/namemyvar.com;
        index index.html;

	location /faq {
		default_type "text/html";
		alias /var/www/namemyvar.com/faq.html;
	}

	ssl_certificate /etc/letsencrypt/live/namemyvar.com/fullchain.pem; # managed by Certbot
	ssl_certificate_key /etc/letsencrypt/live/namemyvar.com/privkey.pem; # managed by Certbot
	ssl_session_cache shared:le_nginx_SSL:1m; # managed by Certbot
	ssl_session_timeout 1440m; # managed by Certbot

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # managed by Certbot
	ssl_prefer_server_ciphers on; # managed by Certbot

	ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256 ECDHE-ECDSA-AES256-GCM-SHA384 ECDHE-ECDSA-AES128-SHA ECDHE-ECDSA-AES256-SHA ECDHE-ECDSA-AES128-SHA256 ECDHE-ECDSA-AES256-SHA384 ECDHE-RSA-AES128-GCM-SHA256 ECDHE-RSA-AES256-GCM-SHA384 ECDHE-RSA-AES128-SHA ECDHE-RSA-AES128-SHA256 ECDHE-RSA-AES256-SHA384 DHE-RSA-AES128-GCM-SHA256 DHE-RSA-AES256-GCM-SHA384 DHE-RSA-AES128-SHA DHE-RSA-AES256-SHA DHE-RSA-AES128-SHA256 DHE-RSA-AES256-SHA256 EDH-RSA-DES-CBC3-SHA"; # managed by Certbot


    if ($scheme != "https") {
        return 301 https://$host$request_uri;
    } # managed by Certbot

}

