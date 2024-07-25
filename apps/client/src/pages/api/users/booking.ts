import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '@/dbConfig/config';
import Ev from '@/models/evModel';




export default async function handler(request:NextApiRequest,response:NextApiResponse){
    if(request.method === "POST"){
        const {pickup,pickuptime,droptime,range} = request.body;
        console.log(pickup,pickuptime,droptime,range);
        if (!pickup || !pickuptime || !droptime || !range) {
            return response.status(400).json({ error: 'values are required' });
          }
          try {
            await connect();

            const data = await Ev.find({is_available:true});
            const Range = parseInt(range);
            if (data.length === 0) {
                return response.status(404).json({ error: 'No data found',range: { $gt: Range }  });
              }
            // Simulate a successful response (replace with your actual logic)
            return response.status(200).json({ success: true, data });
          } catch (error) {
            // Handle any errors that occur during processing
            console.error("Error processing booking", error);
            return response.status(500).json({ error: 'Internal server error' });
          }  
    }else {
        return response.status(405).json({ error: 'Method not allowed' });
     }
   
   
}