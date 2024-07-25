import mongoose from "mongoose"

delete mongoose.connection.models['Evs'];

const EvSchema = new mongoose.Schema({
        reg:{
            type : String,
            required : [true]
        },
        type :{
            type: String,
            required:[true]

        },
        range:{
            type:Number,
            required:[true]
        },
        speed:{
            type:Number,
            required:[true]
        },
        is_available:{
            type:Boolean,
            deafult:true
        }

})

const Ev = mongoose.models.Evs || mongoose.model("Evs",EvSchema)

export default Ev;