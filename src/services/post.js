import axios from 'axios'
import { get } from './storage'

function postReddit(schedulePost) {
    return new Promise((resolve, reject) => {
        get('serverConfig').then(function (serverconfig) {

            let serverUrl = serverconfig.serverAddr, dataObj = {
                "Subreddits": schedulePost.subreddits,
                "Title": schedulePost.title,
                "ScheduleDate": new Date(schedulePost.scheduledate).toISOString(),
                "Provider": "Reddit"
            };
            if (Object.prototype.hasOwnProperty.call(schedulePost, "text")) {
                dataObj["Text"] = schedulePost["text"];
            } else {
                dataObj["Link"] = schedulePost["link"];
            }
            debugger;//eslint-disable-line
            axios.post(serverUrl + "/schedulePost", dataObj).then(() => {
                resolve(true)
            }).catch((e) => {
                reject(e)
            })
        })
    })
}

function postTwitter(schedulePost) {

    return new Promise((resolve, reject) => {
        get('serverConfig').then(function (serverconfig) {
            let serverUrl = serverconfig.serverAddr;
            axios.post(serverUrl + "/schedulePost", {
                "Text": schedulePost.text,
                "ScheduleDate": new Date(schedulePost.scheduledate).toISOString(),
                "Provider": "Twitter"
            }).then(() => {
                resolve(true);
            }).catch((e) => {
                reject(e)
            })
        })
    })

}


function getUsefulData(allposts) {
    var posts = [];
    allposts.forEach(post => {
        var type = postType(post);
        var obj = {
            "Provider": returnIcon(post["Provider"]),
            "ScheduleDate": new Date(post["ScheduleDate"]).toLocaleString(),
            "Complete": returnStatusIcon(post["Complete"])
        };
        obj[type] = post[type];
        if (obj.Provider !== "") {
            posts.push(obj);
        }
    });
    return posts;
}

function returnStatusIcon(status) {
    if (status) {
        return `<span class="icon">
            <i class="fas fa-check"></i>
        </span>`
    } else {
        return `<span class="icon">
            <i class="fas fa-times"></i>
        </span>`
    }
}

function returnIcon(provider) {
    if (provider.toLowerCase() === "reddit") {
        return `<span class="icon provider-icon">
            <i class="fab fa-reddit"></i>
        </span>`
    } else {
        return `<span class="icon provider-icon">
            <i class="fab fa-twitter"></i>
        </span>`
    }
}

function postType(post) {
    if (post["Text"] !== "") {
        return "Text";
    } else {
        return "Link";
    }
}

export { postReddit, postTwitter, getUsefulData }