FROM python:3

RUN apt-get update && apt-get install -y gettext

RUN mkdir /var/log/backend
WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt
