#!/bin/bash


sudo apt-get install gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-4.4.gpg \--dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-4.4.gpg ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
apt-get install -y mongodb-org=4.4.29 mongodb-org-server=4.4.29 mongodb-org-shell=4.4.29 mongodb-org-mongos=4.4.29 mongodb-org-tools=4.4.29
ipv4=$(hostname -I | awk '{print $1}')
sed -i "s/127.0.0.1/127.0.0.1,$ipv4/g" /etc/mongod.conf
cat << EOF | sudo tee -a /etc/mongod.conf
replication:
  replSetName: myReplicaSet
EOF
systemctl enable mongod
systemctl start mongod
