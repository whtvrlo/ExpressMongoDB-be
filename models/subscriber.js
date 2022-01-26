const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    subscribedToChannel: {
        type: String,
        required: true

    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('subscriber', subscriberSchema); //takes 2 parameters: name of database, and schema that corresponds to that model

// const subscriberSchema = new mongoose.Schema(
//     {
//         title: {
//             type: String,
//             required: true
//         },

//         actor: {
//             type: String,
//             required: true
//         }

//     }
// );

// // const Movie = new mongoose.model("Movie", subscribeSchema);
// const Subscribers = new mongoose.model("subscribers", Subscribers);

// module.exports = Movie;