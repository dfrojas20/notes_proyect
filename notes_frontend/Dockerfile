FROM node:18-alpine
RUN apk update
RUN apk add git
RUN git clone https://github.com/dfrojas20/notes_proyect.git
RUN cd notes_proyect/notes_frontend && npm install
CMD cd notes_proyect/notes_frontend && sed -i "s|http://LB_IP/notes|http://${API_HOST}/notes|g" app/app.js && npm run start