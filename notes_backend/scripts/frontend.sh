#!/bin/bash

curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh

sudo bash nodesource_setup.sh

sudo apt install nodejs

sudo apt-get install git

git clone https://github.com/dfrojas20/notes_frontend.git

cd notes_frontend

npm install

sed -i "s|http://LB_IP/notes|http://$1/notes|g" app/app.js

cd ..

service_file="/etc/systemd/system/notesFront.service"

service_content=$(cat <<EOF
[Unit]
Description=Servicio para iniciar notes.app
After=network.target

[Service]
ExecStart=/usr/bin/npm run start
WorkingDirectory=/root/notes_frontend
Restart=always
User=root

[Install]
WantedBy=multi-user.target
EOF
)

echo "$service_content" | sudo tee "$service_file" > /dev/null

sudo systemctl daemon-reload

sudo systemctl enable notesFront.service

sudo systemctl start notesFront.service
