## First Method: 
### Prerequisite:

Before you install and run the project, you need the have the following available in your system:

1 - Docker Desktop, you cand download it [here](https://docs.docker.com/get-docker/)

2 - VSCode IDE, you can download it [here](https://code.visualstudio.com/) 

3 - Install the Remote - Containers extension: [link](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

4 - Open your terminal and clone the project: 

5 - Clone the project
```bash
    git clone https://github.com/ditrit/leto.git
```

6 - Checkout the right branch
```bash
    git checkout leto-quasar-v1.2.0
```

7 - Cd to frontend directory
```bash
    cd frontend
```

8 - Open the frontend directory in VSCode
```bash
    code .    // or open frontend foelder in VSCode
```

9 - Open command palette
```bash
    shift + (cmd/clt) + p  // or view -> Command palette
```

10 - Choose the command and click enter
 > Remote-Containers: build and reopen Container

After installation, Your Dev envirement should run at at http://localhsot:8080.

11 - Open a Second command line tab and cd to backend folder 
```bash
    cd backend 
```

12 - Install dependacy and run api at http://localhsot:3000.
```bash
    npm install and npm run api
```

---

## Second Method: 

### Prerequisite:

Before you install and run the project, you need the have the following available in your system:

1 - Node.js: version 14.17.0 or higher [NodeJs](https://nodejs.org/)

2 - Npm: version 7.19.0 or higher

## Quasar framework CLI installation

```bash
npm install -g @quasar/cli
```

## Open terminal and Select the backend directory

```bash
cd backend
```

## Install the dependencies

```bash
npm install
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
quasar dev
```

### Lint the files

```bash
npm run lint
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).

---
