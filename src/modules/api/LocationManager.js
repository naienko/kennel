import Settings from "./APIManager";

export default {
    get: id => {
        return fetch(`${Settings.RemoteURL}/locations/${id}`).then(results => results.json())
    },
    getAll: () => {
        return fetch(`${Settings.RemoteURL}/locations`).then(results => results.json())
    },
    delete: id => {
        return fetch(`${Settings.RemoteURL}/locations/${id}`, {
            method: "DELETE"
        }).then(results => results.json())
    }
}