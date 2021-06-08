# REACTJS_DJANGO_Nginx_uWSGI_DEPLOYMENT

## nginx configuration file for multiple backend server instances

### Note:  we have mentioned 'least_conn' in 'upstream', so the server instance with least connections will be used to process the request (when new request arrives).

```
upstream backend {
  	least_conn;
  	server django-uwsgi_0:7001;
	server django-uwsgi_1:7002;
	server django-uwsgi_2:7003;
	server django-uwsgi_3:7004;
	server django-uwsgi_4:7005;
	server django-uwsgi_5:7006;
}

server {
    listen 8088;
    server_name djangoreact.com www.djangoreact.com;

    location = /var/www/docker_installer/frontend/build/favicon.ico { access_log off; log_not_found off; }
    location / {
        root /var/www/docker_installer/frontend/build;

        expires 7d;
        add_header Vary Accept-Encoding;
        access_log off;

        gzip on;
        gzip_vary on;
        gzip_proxied expired no-cache no-store private auth;
        gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;
    }


     location /api/ {
        uwsgi_pass      backend;
        # proxy_pass  http://django-uwsgi:7000;

        uwsgi_param  REQUEST_URI        $request_uri;
        uwsgi_param PATH_INFO $document_uri;

        # proxy_intercept_errors on;
        # error_page 301 302 307 = @handle_redirects;
        
        # rewrite /api/(.+) /$1 break;


        # proxy_redirect /api/(.+) http://django-uwsgi/api/$1;
        proxy_redirect     off;
        proxy_set_header   Host $host:8888;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
       

        # proxy_set_header X-Real-IP $remote_addr;
        # proxy_redirect /api/(.+) http://django-uwsgi/api/$1;
        # proxy_redirect     off;
        # proxy_set_header   Host $host;
        include         uwsgi_params;
    }

    # location @handle_redirects {
    #     proxy_pass  http://django-uwsgi:7000;
    # }

    location /djangostatic {
        alias /var/www/docker_installer/frontend/build/django/static;
    }
}
```


## nginx configuration file for single backend server

```
server {
    listen 8090;
    server_name djangoreact.com www.djangoreact.com;
    location = /home/ko/REACTJS_DJANGO_APACHE_DEPLOYMENT/Reactapp/myapp/build/favicon.ico { access_log off; log_not_found off; }
    location / {
        root /home/ko/REACTJS_DJANGO_APACHE_DEPLOYMENT/Reactapp/myapp/build;
    }
    
    location /api/ {
	alias /;
        include         uwsgi_params;
        uwsgi_pass      unix:/home/ko/REACTJS_DJANGO_APACHE_DEPLOYMENT/djangoserver/djangoserver/djangoserver.sock;
    }
}
```
