# 🖥 Sheddit UI

A desktop application for [Sheddit](https://github.com/rahulnpadalkar/Sheddit)

## Features

* Schedule Bulk Posts for Reddit
* Schedule Tweets
* Generate env file necessary for the Backend app to work
* Check status of backend service
* See status of all scheduled posts

### Note

While generating env files, you have to enter secret keys which you aren't supposed to share with anyone. The app just reads them and generates a file for you. It's just for your convenience. The app doesn't store those and neither is transmitted on the network. **It's completely optional to use it.**

## Setup

### Install all dependencies
```
npm install
```

### Run desktop app in development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
