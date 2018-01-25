server {
	listen 80;
	server_name namemyvar.com www.namemyvar.com;
	return 301 https://$server_name$request_uri;
}

server {
	listen 443;
	server_name namemyvar.com www.namemyvar.com;

	ssl on;
	ssl_certificate /opt/ssl/namemyvar.com.pem;
	ssl_certificate_key /opt/ssl/namemyvar.com.key;

	access_log /var/log/nginx/namemyvar.com.access.log;
	error_log /var/log/nginx/namemyvar.com.error.log;

	root /var/www/namemyvar.com;
	index index.html;

	location /faq {
		default_type "text/html";
		try_files $uri $uri.html =404;
	}
}
