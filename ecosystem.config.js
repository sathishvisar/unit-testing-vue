module.exports = {
    apps: [
        {
            name: "campaygn_v3",
            // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: "1G",
            env_production: {
                NODE_ENV: "production"
            }
        }
    ],
    deploy: {
        production: {
            user: "root",
            host: "104.248.93.159",
            ref: "origin/master",
            repo: "git@github.com:sathishvisar/unit-testing-vue.git",
            path: "/home/unit-testing-vue",
            "post-deploy":
                "npm install && npm run build && mkdir -p release && rm -rf release/* && cp -r dist/* release && pm2 restart campaygn_v3"
        }
    }
};
// pm2 start serve --name campaygn_v3 -- -s release -l 5000
