import axios from "axios";
const url = "http://localhost:3001";

export default class ApiClient {
     constructor(tokenProvider, logoutHandler) {
        this.tokenProvider = tokenProvider;
        this.logoutHandler = logoutHandler;
      }
    
    //   authenticatedCall(method, url, data) {
    //     const userCookie = document.cookie
    //     const token = getToken(userCookie)
    //     return axios({
    //       method,
    //       url,
    //       headers: {
    //         authorization: token,
    //       },
    //       data,
    //     }).catch((error) => {
    //       if (error.response.status === 403) {
    //         this.logoutHandler();
    //         return Promise.reject();
    //       } else {
    //         throw error;
    //       }
    //     });
    //   }

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
    .then(response => response.json())
    .then(data => {
    // Set token as a cookie
        if (data.status === 200) {
            window.location.href = "/feed";
        } else {
            window.location.href = "/login";
            alert(data.message);
        }
    // Redirect or perform any other actions after successful login
    })
    .catch(error => console.error('Error logging in:', error));
    }
}
    // Make authenticated request
//     // authenticatedRequest(page) {
//     //         fetch(page,{
//     //         method: 'GET',
//     //         headers: {
//     //         'Content-Type': 'application/json',
//     //         'Authorization': `Bearer ${getCookie('token')}`
//     //         }
//     //     })
//     //     .then(response => response.json())
//     //     .then(data => {
//     //         console.log(data);
//     //         console.log("success")
//     //     })
//     //     .catch(error => console.error('Error making authenticated request:', error));
//     // }
//   // Function to get a specific cookie value by name
//     getCookie(name) {
//         const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//         return cookieValue ? cookieValue.pop() : '';
//     }




