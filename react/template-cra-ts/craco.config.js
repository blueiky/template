const path = require("path");
const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "root-entry-name": "variable"
                        },
                        javascriptEnabled: true,
                    }
                }
            }
        },
    ],
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "src")
        },
    }
}
