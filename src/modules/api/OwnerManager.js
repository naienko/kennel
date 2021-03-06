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
    },
    post(newOwner) {
        return fetch(`${Settings.RemoteURL}/owners`, {
        	method: "POST",
        	headers: {
            	"Content-Type": "application/json"
        	},
        	body: JSON.stringify(newOwner)
        }).then(data => data.json())
    },
    edit(editedOwner) {
         return fetch(`${Settings.RemoteURL}/owners/${editedOwner.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedOwner)
        }).then(data => data.json());
    }
}