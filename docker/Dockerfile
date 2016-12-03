FROM node:6.8

ARG appurl

RUN apt-get install -y git
WORKDIR /home/node
RUN git clone ${appurl} 
WORKDIR /home/node/q
RUN npm install
RUN npm run build 

CMD ["npm", "start"]
