module.exports = {
  apps : [{
    name: "WinCC REST API",
    script: "./dist/main.js",
    env: {
      NODE_ENV: "production",
      PORT: "4000"
    },
  }]
}