import Settings from "./APIManager";

export default {
    get: id => {
        return fetch(`${Settings.RemoteURL}/animals/${id}`).then(results => results.json())
    },
    getAll: () => {
        return fetch(`${Settings.RemoteURL}/animals`).then(results => results.json())
    },
    delete: id => {
        return fetch(`${Settings.RemoteURL}/animals/${id}`, {
            method: "DELETE"
        })
        .then(results => results.json())
    },
    post(newAnimal) {
        return fetch(`${Settings.RemoteURL}/animals`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newAnimal)
        }).then(data => data.json())
      }
}