FROM alpine as builder

RUN apk update && apk add git build-base
WORKDIR /tmp

RUN git clone https://github.com/google/jsonnet.git
RUN cd jsonnet && make jsonnet
RUN cp jsonnet/jsonnet /usr/local/bin

COPY dashboard.jsonnet /tmp
RUN git clone https://github.com/grafana/grafonnet-lib.git
RUN jsonnet -J /tmp/grafonnet-lib dashboard.jsonnet -o dashboard.json
FROM grafana/grafana
COPY --from=builder /tmp/dashboard.json /data/dashboards/


