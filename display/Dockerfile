FROM node:20-alpine

WORKDIR /app/

RUN apk update && apk add bash openntpd

CMD ["tail", "-f", "/dev/null"]
# CMD ["yarn", "dev"]