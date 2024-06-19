FROM node:18
RUN apt-get update
RUN apt upgrade -y
RUN apt-get install curl git -y
RUN git clone https://github.com/dfrojas20/notes_backend.git
RUN cd notes_backend && npm install
CMD cd notes_backend && echo "${DB_HOST}" && DB_HOST=${DB_HOST} npm run start

