async function fetch_all_pages(url){
    let vaiindo = true
    let result = []
    let page = 1
    while(vaiindo){
        const response = await fetch(`${url}?page=${page}`)
        const tmpitems = await response.json()
        if(tmpitems.length > 0){
            result = result.concat(tmpitems)
            page++
        } else {
            vaiindo = false
        }
    }
    return result
}

export const api = {
    async search_users(searchstring){
        const url = `https://api.github.com/search/users?q=${searchstring}`
        const response = await fetch(url)
        return await response.json()
        // const url = require("@/api/api_mock/api_mock_users.json")
        // return url
    },
    async lista_repos(username){
        const url = `https://api.github.com/users/${username}/repos`
        const data = await fetch_all_pages(url)
        return data
        // const url = require("@/api/api_mock/api_mock_repos.json")
        // return url
    },
    async listaIssues(owner, name, page) {
        const url = `https://api.github.com/repos/${owner}/${name}/issues?page=${page}`
        const response = await fetch(url)
        return await response.json()
        // const url = require("@/api/api_mock/api_mock_issues.json")
        // return url
    },
    async listaFiles(owner, repo, path = '') {
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
        const response = await fetch(url)
        return await response.json()
        // const url = require("@/api/api_mock/api_mock_contents.json")
        // return url
    },
    // async listaDir(name) {
    //     const url = `https://api.github.com/repos/${owner}/${name}/git/trees/84a4b2f94adae841adf633f3083520c856f6cd91`
    //     const response = await fetch(url)
    //     return await response.json()
    //     // const url = require("@/api/api_mock/api_mock_contents_dir.json")
    //     // return url
    // }
}

// async function fetch_all_pages(url){
//     let vaiindo = true
//     let result = []
//     let page = 1
//     while(vaiindo){
//         const response = await fetch(`${url}?page=${page}`)
//         const tmpitems = await response.json()
//         if(tmpitems.length > 0){
//             result = result.concat(tmpitems)
//             page++
//         } else {
//             vaiindo = false
//         }
//     }
//     return result
// }

// export const api = {
//     async search_users(searchstring){
//         const url = require("@/api/api_mock/api_mock_users.json")
//         return url
//     },
//     async lista_repos(username){
//         const url = require("@/api/api_mock/api_mock_repos.json")
//         return url
//     },
//     async listaIssues(owner, name, page) {
//         // const url = `https://api.github.com/repos/${owner}/${name}/issues?page=${page}`
//         // const response = await fetch(url)
//         // return await response.json()
//         const url = require("@/api/api_mock/api_mock_issues.json")
//         return url
//     },
//     async listaFiles(owner, repo, path) {
//         // const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
//         // const response = await fetch(url)
//         // return await response.json()
//         const url = require("@/api/api_mock/api_mock_contents.json")
//         return url
//     },
//     // async listaDir(name) {
//     //     const url = `https://api.github.com/repos/${owner}/${name}/git/trees/84a4b2f94adae841adf633f3083520c856f6cd91`
//     //     const response = await fetch(url)
//     //     return await response.json()
//     //     // const url = require("@/api/api_mock/api_mock_contents_dir.json")
//     //     // return url
//     // }
// }