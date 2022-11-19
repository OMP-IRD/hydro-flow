# SAGUI

## Dev

```
ng serve sagui
```

will run `sagui` as an Angular application available on localhost:4200.

## Building without Docker

You can build the sagui app using the geonetwork-ui build command:

```shell script
npm run build -- sagui --prod
```

The build artifact will be stored in the `dist/apps/sagui` directory, that can be deployed on a common webserver. Use the `--prod` flag for a production build.

## Building with Docker

You can build a docker image of the sagui application like so:

```bash
$ nx run sagui:docker-build --tag=pigeosolutions/sagui-ui
```

This will build a docker image with the tag `pigeosolutions/sagui:latest`.

```bash
$ docker run -p 8080:80 pigeosolutions/sagui-ui
```

The application will be available on http://localhost:8080/sagui/.
