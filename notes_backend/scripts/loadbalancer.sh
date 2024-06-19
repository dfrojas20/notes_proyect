#!/bin/bash

apt install nginx -y

cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf__bak

cat << EOF > /etc/nginx/nginx.conf
events {
  worker_connections 768;
  # multi_accept on;
}

http{
 upstream backend {
   server back1.lxd:3000;
   server back2.lxd:3000;
   server back3.lxd:3000;
 }
server {
    listen 80;
    location / {
        proxy_pass http://backend/;
    }
 }
}
EOF

nginx -t

systemctl restart nginx



