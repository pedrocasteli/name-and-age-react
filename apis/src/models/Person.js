import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "A person must have a name!"],
    },
    age: { type: Number, required: [true, "A person must have an age."] },
});

const Person = mongoose.model("Person", personSchema);

export default Person;
