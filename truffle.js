const path = require('path');

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
        }
    }
    ,  contracts_build_directory: path.join(__dirname, "src/contracts"),

};
