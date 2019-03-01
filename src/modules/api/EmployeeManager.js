import Settings from "./APIManager";

export default {
    get: id => {
        return fetch(`${Settings.RemoteURL}/employees/${id}`).then(results => results.json())
    },
    getAll: () => {
        return fetch(`${Settings.RemoteURL}/employees`).then(results => results.json())
    },
    delete: id => {
        return fetch(`${Settings.RemoteURL}/employees/${id}`, {
            method: "DELETE"
        }).then(results => results.json())
    }
}