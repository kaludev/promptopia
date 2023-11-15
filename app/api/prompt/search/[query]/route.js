import { connectToDB } from "@utils/database";

import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const query = params.query;
    console.log(query);
    const users = await User.find({
      username: { $regex: new RegExp(query, "i") },
    });
    console.log(users);
    const graded = users.map((user) => {
      let scoreNum =
        user.username.length / 4 -
        4 * user.username.search(new RegExp(query, "i"));
      return { ...user._doc, scoreNum };
    });
    graded.sort((a, b) => {
      return b.scoreNum - a.scoreNum;
    });
    const prompts = await Prompt.find({
      $or: [
        { prompt: { $regex: new RegExp(query, "i") } },
        { tag: { $regex: new RegExp(query, "i") } },
        { creator: users.length > 0 ?graded[0]._id :  undefined},
      ],
    }).populate("creator");
    const gradedPrompts = prompts.map((prompt) => {
      let scoreNum;
      if (new RegExp(query, "i").test(prompt.prompt)) {
        
        scoreNum =
          prompt.prompt.length / 4 -
          4 * prompt.prompt.search(new RegExp(query, "i"));
          console.log("" + prompt.prompt.length / 8+" "+ prompt.prompt.search(new RegExp(query, "i"))+" " + new RegExp(query, "i"));
      }else if (new RegExp(query, "i").test(prompt.tag)) {
        scoreNum =
          prompt.tag.length / 4 -
          4 * prompt.tag.search(new RegExp(query, "i"));

      }else {
        // Append the scoreNum of the first user to the prompt
        scoreNum = graded[0].scoreNum;
      }
      return { ...prompt._doc, scoreNum };
    });
    gradedPrompts.sort((a, b) => {
      return b.scoreNum - a.scoreNum;
    });
    console.log(gradedPrompts)
    return new Response(JSON.stringify(gradedPrompts), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};
