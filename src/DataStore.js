const Store = require('electron-store');

const usernameKey = 'username';
const emailKey = 'email';

class DataStore extends Store {
    constructor(options) {
        super(options);
    }

    getUsername() {
        return this.get(usernameKey);
    }

    setUsername(value) {
        this.set(usernameKey, value);
        return this;
    }

    getEmail() {
        return this.get(emailKey);
    }

    setEmail(value) {
        this.set(emailKey, value);
        return this;
    }
}

module.exports = DataStore;
