import axios from 'axios';
function subscribeToNetwork(onNetworkFailure, onNetworkSuccess) {
    window.removeEventListener('online', onNetworkSuccess);
    window.removeEventListener('offline', onNetworkFailure);
    window.addEventListener('online', onNetworkSuccess);
    window.addEventListener('offline', onNetworkFailure);
}


function isServerOnline(serveraddress) {
    return new Promise((resolve, reject) => {
        axios.get(serveraddress + "/status").then(() => {
            resolve(true)
        }).catch((e) => {
            reject(e)
        })
    });
}

function getAllSchedules(serveraddress) {
    return new Promise((resolve, reject) => {
        axios.get(serveraddress + "/getallschedules").then((res) => {
            resolve(res.data);
        }).catch((e) => {
            reject(e);
        })
    })
}

export { subscribeToNetwork, isServerOnline, getAllSchedules }