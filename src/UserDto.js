class UserDto {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }
}

module.exports = UserDto;
