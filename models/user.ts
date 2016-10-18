import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface IUser extends mongoose.Document {
    username: string,
    password: string,
}

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        set: function (v: string) {
            return v.toLowerCase().trim();
        },
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    }
});