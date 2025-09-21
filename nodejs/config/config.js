const fs = require('fs');

const CONFIG = './config/config.json';

let json = undefined;

function getJSON() {
    if (!fs.existsSync(CONFIG)) return;
    if (!json) json = JSON.parse(fs.readFileSync(CONFIG, 'utf-8'));
    return json;
}

function get(key) {
    return getJSON()[key];
}

function save(key, value) {
    const j = getJSON();
    j[key] = value;
    fs.writeFileSync(CONFIG, JSON.stringify(j));
}

module.exports = { get, save };
