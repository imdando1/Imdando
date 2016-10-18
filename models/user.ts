import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface IUser extends mongoose.Document {
    username: string,
    password: string,
    setPassword(),
    validatePassword(),
    generateToken()
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

userSchema.method({
    setPassword: function(password){
        this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },
    validatePassword: function(password){
        return bcrypt.compareSync(password, this.password);
    },
    generateToken: function(){
        let payload = {
            id: this._id,
            username: this.username,
            admin: this.admin
        }
        return jwt.sign(payload, 'SomeSecretKey');
    }
})

export default mongoose.model<IUser>('User', userSchema);