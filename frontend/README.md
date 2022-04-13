
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
quasar build
```


## Add gandalf directory "Backend API"

Clone :

```bash
git clone  https://github.com/ditrit/gandalf.git
```

```bash
git checkout develop
```

Cd :

```bash
cd gandalf/core/
```

- Start docker desktop application
- Run this command:

```bash
./testbackend.sh run <Storage> <-- This is optional
```
