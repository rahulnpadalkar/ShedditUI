import { shell } from "electron";
import { remote } from "electron";
import fs from "fs";

function openLink(link) {
    shell.openExternal(link)
}

function writeAndSave(twitter, reddit) {
    var options = {
        title: "Save file",
        buttonLabel: "Save",
    }
    var content = "";
    content += generateContent(twitter, "t_");
    content += generateContent(reddit);
    content += "bucketname=schedules\nauth_url=www.reddit.com\nsecure_api=https://oauth.reddit.com/api\n"
    fs.writeFileSync(remote.dialog.showSaveDialogSync(options), content, 'utf-8');

}

function generateContent(obj, prefix) {
    var data = "";
    Object.keys(obj).forEach((key) => {
        data += (prefix ? prefix : "") + key + "=" + obj[key] + "\n";
    })
    return data;
}


export { openLink, writeAndSave }