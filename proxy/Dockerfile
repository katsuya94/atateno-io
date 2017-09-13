FROM nginx:1.13.5-alpine

ADD nginx.conf.template /etc/nginx/conf.d/nginx.conf.template

CMD ["sh", "-c", "envsubst < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/nginx.conf && nginx -g 'daemon off,'"]
