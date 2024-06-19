FROM node:18
RUN apt-get update
RUN apt upgrade -y
RUN apt-get install curl git -y
RUN git clone https://github.com/dfrojas20/notes_frontend.git
RUN cd notes_frontend && npm install
CMD cd notes_frontend && sed -i "s|http://LB_IP/notes|http://${API_HOST}/notes|g" app/app.js && npm run start