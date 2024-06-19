#!/bin/bash

chmod +x database.sh
chmod +x backend.sh
chmod +x loadbalancer.sh
chmod +x frontend.sh

for i in {1..3}; do
    sudo lxc launch ubuntu:focal mongo$i
    sleep 10
done

echo "preparando bases de datos..."
sleep 10

ip_mongo1=$(sudo lxc list | grep mongo1 | awk '{print $6}')
ip_mongo2=$(sudo lxc list | grep mongo2 | awk '{print $6}')
ip_mongo3=$(sudo lxc list | grep mongo3 | awk '{print $6}')

for i in {1..3}; do
    sudo lxc file push database.sh mongo$i/tmp/
    sudo lxc exec mongo$i /tmp/database.sh
done

echo "configurando el cluster..."
sleep 7

sudo lxc exec mongo1 -- mongo --eval "rs.initiate({_id: 'myReplicaSet', members: [{_id: 0, host: '$ip_mongo1:27017'},{_id: 1, host: '$ip_mongo2:27017'},{_id: 2, host: '$ip_mongo3:27017'}]})"

echo "preparando backends...."
sleep 10

for i in {1..3}; do
    sudo lxc launch ubuntu:jammy back$i
    sleep 13
    sudo lxc file push backend.sh back$i/tmp/
    sudo lxc exec back$i /tmp/backend.sh $ip_mongo1 $ip_mongo2 $ip_mongo3
    sleep 7
done

echo "preparando loadbalancer..."
sleep 5

sudo lxc launch ubuntu:jammy loadbalancer
sleep 13

sudo lxc file push loadbalancer.sh loadbalancer/tmp/
sleep 5
sudo lxc exec loadbalancer /tmp/loadbalancer.sh
echo "ejecutando script..."
sleep 7

ip_loadbalancer=$(sudo lxc list | grep loadbalancer | awk '{print $6}')

echo "preparando frontends..."

for i in {1..3}; do
    sudo lxc launch ubuntu:jammy front$i
    sleep 13
    sudo lxc file push frontend.sh front$i/tmp/
    sudo lxc exec front$i /tmp/frontend.sh $ip_loadbalancer
    sleep 7
done

echo "configurando dns.."

sudo cp /etc/hosts /etc/hosts__bak
for container_ip in $(sudo lxc list | grep front | awk '{print $6}'); do
  echo $container_ip app.notes.com | sudo tee -a /etc/hosts
done
cat /etc/hosts
dig app.notes.com
