FROM vimagick/alpine-arm:3.3
#COPY qemu-arm-static /usr/bin/qemu-arm-static

ENV APP_HOME /home/sandbox-frontend

RUN apk update && \
    apk add \
    ca-certificates \
    python3 \
    wget

RUN apk del wget ca-certificates && rm -rf /var/cache/apk/*

RUN apk update && apk add \
    build-base \ 
    ca-certificates \
    libffi-dev \ 
    python3 \
    python3-dev \
    wget \ 
    && wget "https://bootstrap.pypa.io/get-pip.py" -O /dev/stdout | python3

WORKDIR /home/sandbox-frontend

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

RUN rm -rf /var/cache/apk/*

ADD . $APP_HOME

#ENTRYPOINT ["tar", "-cvz", "/usr/lib/python3.5/site-packages/", "/home/sandbox-frontend"]
ENTRYPOINT ["python3", "/home/sandbox-frontend/app.py"]
