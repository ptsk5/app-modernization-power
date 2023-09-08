FROM registry.access.redhat.com/ubi8/nodejs-16:1-118 as build

# WORKDIR /opt/app-root

COPY package*.json .
RUN npm ci --only=production

COPY . . 
RUN npm run build


FROM registry.access.redhat.com/ubi8/nginx-120:1-117

COPY --from=build /opt/app-root/src/build .
COPY --from=build /opt/app-root/src/nginx/api-location.conf /opt/app-root/etc/nginx.default.d/

EXPOSE 8080 

CMD ["nginx", "-g", "daemon off;"]