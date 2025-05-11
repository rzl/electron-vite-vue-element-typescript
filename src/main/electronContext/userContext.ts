import { db } from "../db/db.providers";
import { registerContext } from "../electronContext";

registerContext('get', '/user', (opt: any) => {

})

registerContext('post', '/user', (opt: any) => {
    console.log(opt.body)
    return db.users.findOne({
        where: { username: opt.body.username }
    })
})