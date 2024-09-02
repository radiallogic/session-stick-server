FROM python:3-alpine

WORKDIR /usr/src/app

# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt

RUN apk update && apk add bash
RUN pip install paho-mqtt
RUN pip install pymongo

# COPY . .

# CMD [ "python", "./main.py" ]
CMD ["tail", "-f", "/dev/null"]