import axios from "axios";
const url = "https://wanderlogback.onrender.com";
// const url = "http://localhost:3001";

export default class ApiClient {
     constructor(tokenProvider, logoutHandler) {
        this.tokenProvider = tokenProvider;
        this.logoutHandler = logoutHandler;
      }
    
    //other backend calls go here

    //get token

    // getToken(cookie) {
        
    // }

    //register

    //login

    //logout

    // Perform login request
    getLogin(username, password) {
        return axios({
            method: "POST", // Use the appropriate HTTP method
            url: `${url}/login`,
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              username: username,
              password: password,
            },
        })
    .then(response => {
      console.log(response.data);
      return response.data; // return response data containing status and message
    })
    .catch(error => {
      throw error; // re-throw the error to be caught by the caller
    });
  }

  register(username, password) {
    return axios({
      method: "POST", // Use the appropriate HTTP method
      url: `${url}/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        password: password,
      },
    })
  .then(response => {
    console.log(response.data);
  return response.data; // return response data containing status and message
  })
  .catch(error => {
  throw error; // re-throw the error to be caught by the caller
  });
}

}



