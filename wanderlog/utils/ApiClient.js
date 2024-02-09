import axios from "axios";
const url = "http://localhost:3001";

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
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.status === 200) {
    //         window.location.href = "/feed"; //redirect to feed if login successful
    //     } else {
    //         window.location.href = "/login"; //redirect back to login if login unsuccessful
    //         alert(data.message); //TODO replace with toast
    //     }
    // })
    // .catch(error => console.error('Error logging in:', error));
    // }
    .then(response => {
      console.log(response.data);
      return response.data; // return response data containing status and message
    })
    .catch(error => {
      throw error; // re-throw the error to be caught by the caller
    });
  }


}



