import { connect } from '@/dbConfig/config';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';

interface UserRequestBody {
    email: string;
    password: string;
}

export default async function handler(request: NextRequest, response: NextResponse) {
    await connect();
    try {
        if (!request.body) {
            return response.status(400).json({ error: "Request body is empty" });
        }

        const requestBody: UserRequestBody = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
        const { email, password } = requestBody;
        console.log(request.body);

        const user = await User.findOne({ email });
        if (user) {
            return response.status(400).json({ comment: "User already exists" });
        }
        const newUser = new User({
            email,
            password
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        return response.status(200).json({
            message: "User registered successfully",
            success: true,
            savedUser
        });
    } catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
}
