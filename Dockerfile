FROM alpine:3.11

WORKDIR /home/app

ENV NODE_ENV production
ENV NODE_VERSION 12.15.0-r1

# 安装nodejs环境
RUN echo "https://mirrors.aliyun.com/alpine/v3.11/main/" > /etc/apk/repositories \
    && echo "https://mirrors.aliyun.com/alpine/v3.11/community/" >> /etc/apk/repositories \
    && apk update \
    && apk add --no-cache --update "nodejs=${NODE_VERSION}" \
    && node -v

COPY . /home/app/

EXPOSE 80

CMD ["node","dist/index.js"]