import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '@/dbConfig/config';
import Ev from '@/models/evModel'




export default async function handler(request:NextApiRequest,response :NextApiResponse){
   if(request.method === "POST"){
    const {reg,type,range,speed} = request.body;
    console.log(reg,type,range,speed);
    if (!reg || !type || !range || !speed) {
        return response.status(400).json({ error: 'values are required' });
      }
    try {
        await connect()

        const ev = await Ev.findOne({ reg });
        if (ev) {
            return response.status(400).json({ comment: "User already exists" });
        }
        const Range = parseInt(range);
        const Speed = parseInt(speed);
        console.log(Range,Speed);
        const newEv = new Ev ({
            reg,
            type,
            range:Range,
            speed:Speed,
            is_available: true
        });

        const savedEv =await newEv.save();
        console.log(savedEv)
        return response.status(200).json({
            message: "Ev registered successfully",
            success: true,
            savedEv
        });
    } catch (error) {
        console.error('error registering Ev:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}
        
}