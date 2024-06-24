FROM node:18-alpine
RUN apk update
RUN apk add git
RUN git clone https://github.com/dfrojas20/notes_proyect.git
RUN cd notes_proyect/notes_backend && npm install
CMD cd notes_proyect/notes_backend && echo "${DB_HOST}" && DB_HOST=${DB_HOST} npm run start

