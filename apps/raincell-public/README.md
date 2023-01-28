# Raincell Public

## Dev

```
ng serve raincell-public
```

will run `raincell-public` as an Angular application available on localhost:4200.

## Building without Docker

You can build the raincell-public app using the geonetwork-ui build command:

```shell script
npm run build -- raincell-public --prod
```

The build artifact will be stored in the `dist/apps/raincell-public` directory, that can be deployed on a common webserver. Use the `--prod` flag for a production build.

## Building with Docker

You can build a docker image of the raincell-public application like so:

```bash
$ nx run raincell-public:docker-build --tag=pigeosolutions/raincell-public
```

This will build a docker image with the tag `pigeosolutions/raincell-public:latest`.

```bash
$ docker run -p 8080:80 pigeosolutions/raincell-public
```

The application will be available on http://localhost:8080/raincell/.
