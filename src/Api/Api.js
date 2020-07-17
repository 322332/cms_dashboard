const apiURL = "http://127.0.0.1:3000/api/";

export default function request(endPoint, content) {
  return fetch(apiURL + endPoint, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      "auth-token":
        "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
    },
    body: JSON.stringify(content),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
}
