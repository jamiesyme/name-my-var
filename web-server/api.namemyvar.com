server {	
	listen 80;
	server_name api.namemyvar.com;
	return 301 https://$server_name$request_uri;
}

server {
	listen 443;
	server_name api.namemyvar.com;

	ssl on;
	ssl_certificate /opt/ssl/namemyvar.com.pem;
	ssl_certificate_key /opt/ssl/namemyvar.com.key;

	access_log /var/log/nginx/api.namemyvar.com.access.log;
	error_log /var/log/nginx/api.namemyvar.com.error.log;

	location / {
		proxy_pass http://localhost:8001;
	}
}
