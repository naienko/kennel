import Settings from "./APIManager";

export default {
    get: id => {
        return fetch(`${Settings.RemoteURL}/owners/${id}`).then(results => results.json())
    },
    getAll: () => {
        return fetch(`${Settings.RemoteURL}/owners`).then(results => results.json())
    },
    delete: id => {
        return fetch(`${Settings.RemoteURL}/owners/${id}`, {
            method: "DELETE"
        }).then(results => results.json())
    }
}