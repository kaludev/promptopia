import { connectToDB } from "@utils/database";

import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req, {params}) => {
    

    try{
        await connectToDB();
        const user = await User.findOne({username : params.id});

        const prompts = await Prompt.find({
            creator: user?.id || params.id
        }).populate('creator')

        return new Response(JSON.stringify(prompts),{
            status: 200
        })
    }catch(err){
        return new Response("Failed to fetch prompts",{
            status: 500
        })
    }
}