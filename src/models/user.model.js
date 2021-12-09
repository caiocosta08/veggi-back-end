module.exports = class User {
    constructor(name, email, post, level, entry_date, status, password_hash, birthday_date) {
        this.name = name;
        this.email = email;
        this.post = post;
        this.level = level;
        this.entry_date = entry_date;
        this.status = status;
        this.password_hash = password_hash;
        this.birthday_date = birthday_date;
    }
}