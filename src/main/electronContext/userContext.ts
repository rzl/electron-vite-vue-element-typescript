import { db } from "../db/db.providers";
import { registerContext } from "../electronContext";

registerContext('post', '/user', async (opt: any) => {
    let user = await db.users.findOne({
        where: { username: opt.body.username }
    })
    console.log(user)
    return user.toJSON();
})