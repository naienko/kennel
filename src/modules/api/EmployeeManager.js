import Settings from "./APIManager";

export default {
    get: id => {
        return fetch(`${Settings.RemoteURL}/employees/${id}`).then(results => results.json())
    },
    getAll: () => {
        return fetch(`${Settings.RemoteURL}/employees`).then(results => results.json())
    },
    deleteAndGetAll: id => {
        return fetch(`${Settings.RemoteURL}/employees/${id}`, {
            method: "DELETE"
        })
        .then(() => fetch(`${Settings.RemoteURL}/employees`))
        .then(results => results.json())
    },
    delete: id => {
        return fetch(`${Settings.RemoteURL}/employees/${id}`, {
            method: "DELETE"
        })
    },
    post(newEmployee) {
        return fetch(`${Settings.RemoteURL}/employees`, {
        	method: "POST",
        	headers: {
            	"Content-Type": "application/json"
          	},
          	body: JSON.stringify(newEmployee)
        }).then(data => data.json())
      },
    edit(editedEmployee) {
        return fetch(`${Settings.RemoteURL}/employees/${editedEmployee.id}`, {
        	method: "PUT",
          	headers: {
            	"Content-Type": "application/json"
          	},
          	body: JSON.stringify(editedEmployee)
        }).then(data => data.json());
      }
}