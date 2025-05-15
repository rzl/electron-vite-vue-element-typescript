export async function vaildUser(user:  {username: string, password: string}) {
    return window.electronContext.call({method: 'post', path:'/user', body: user})
}