FROM python:3-alpine

WORKDIR /usr/src/app

# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt

RUN apk update && apk add bash openntpd
RUN pip install paho-mqtt
RUN pip install pymongo
#RUN apk add --no-cache mongodb-tools

# COPY . .

CMD [ "python", "./main.py" ]
#CMD ["tail", "-f", "/dev/null"]