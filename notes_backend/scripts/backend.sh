#!/bin/bash

#sudo apt-get update

curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh

sudo bash nodesource_setup.sh

sudo apt install nodejs

sudo apt-get install git

npm i -g @nestjs/cli

git clone https://github.com/dfrojas20/notes_backend.git

cd notes_backend

npm install

#URL1=$1 URL2=$2 URL3=$3 npm run start
cd ..

service_file="/etc/systemd/system/notes.service"

service_content=$(cat <<EOF
[Unit]
Description=Servicio para iniciar notes.app
After=network.target

[Service]
ExecStart=/usr/bin/npm run start
WorkingDirectory=/root/notes_backend
Restart=always
User=root
Environment=URL1=$1
Environment=URL2=$2
Environment=URL3=$3

[Install]
WantedBy=multi-user.target
EOF
)

echo "$service_content" | sudo tee "$service_file" > /dev/null

sudo systemctl daemon-reload

sudo systemctl enable notes.service

sudo systemctl start notes.service
