# Krateo Frontend

## Installation
Clone repository on your machine

Install dependencies
```sh
npm install
```

## Start in local
Launch application
```sh
$ export "VITE_GATEWAY_API_BASE_URL=https://api.krateoplatformops.io" && export "VITE_AUTHN_API_BASE_URL=https://api.krateoplatformops.io/authn" &&  npm run dev
```

## Deploying
Build application 
```sh
$ export "VITE_GATEWAY_API_BASE_URL=https://api.krateoplatformops.io" && export "VITE_AUTHN_API_BASE_URL=https://api.krateoplatformops.io/authn" &&  npm run build
```

Copy content of _/build_ folder in your web server
