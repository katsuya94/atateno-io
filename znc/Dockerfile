FROM alpine:3.6

RUN addgroup -S app && adduser -S -G app app

WORKDIR /home/app

RUN apk update
RUN apk add sudo
RUN apk add znc
RUN apk add ca-certificates

ADD entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
CMD ["znc", "--foreground"]
