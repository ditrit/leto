
## Prerequisite:

Before you install and run the project, you need the have the following available in your system:

1 - Docker Desktop, you cand download it [here](https://docs.docker.com/get-docker/)

2 - Node.js: version 14.17.0 or higher [NodeJs](https://nodejs.org/)


## Quasar framework CLI installation

```bash
npm install -g @quasar/cli
```

## Open a new terminal tab and Select the frontend directory

```bash
cd frontend
```

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
npm run dev
```

### To Lint the files

```bash
npm run lint
```

### To Build the app for production

```bash
npm run build
```

The binary of the built app is in the `dist/spa` folder.

### Environment variable

`GANDALF_API_BASE_URL` is used to define the url of Gandalf, by default is equals to `/ditrit/Gandalf/1.0.0`.

If you don't want to redefine it, you have to setup a reverse proxy.

To override it :

```bash
GANDALF_API_BASE_URL="Something else" npm run build
```

### Reverse proxy for the production

In the dev mode, we use a reverse proxy to make a redirection from `http://localhost:8080/ditrit/*` to `http://127.0.0.1:9203/ditrit/*`.

So, for production mode we need this same thing, there is an example for a Nginx configuration:

```bash
# nginx.conf
http {
  server {
    listen 80;
    root /usr/share/nginx/html;

    location /ditrit {
      proxy_pass http://127.0.0.1:9203;
    }

    location / {
      try_files $uri $uri/ /index.html;
    }
  }
}
```

So, feel free to modify it, according your gandalf configuration.

## Add gandalf directory "Backend API"

Clone :

```bash
git clone  https://github.com/ditrit/gandalf.git
cd gandalf
git checkout api-development
```

### Build gandalf

```bash
cd core
./testbackend.sh build
```

### Start docker desktop application

```bash
./testbackend.sh run
```

For more information, please read [gandalf documentation](https://github.com/ditrit/gandalf/blob/api-development/core/README.md).
