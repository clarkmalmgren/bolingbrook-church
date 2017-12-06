FROM ubuntu:16.04

# Used to generate unique hash so apt-get runs again...
RUN echo "Bolingbrook Church"

# Update and Install Dependencies
RUN apt-get update
RUN apt-get -y dist-upgrade
RUN apt-get -y install curl

# Install NPM
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get -y install nodejs

# Install ForeverJS
RUN npm install -g forever

# Create User and use it
RUN useradd -ms /bin/bash faith
USER faith

# Add Files
ADD dist /opt/bolingbrook-church/dist
WORKDIR /opt/bolingbrook-church

# Expose Port 4000 and Create Start Script
EXPOSE 4000
ENTRYPOINT forever dist/server.js
