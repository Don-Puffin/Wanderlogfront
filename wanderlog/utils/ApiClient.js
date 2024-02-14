import axios from "axios";
const url = "https://wanderlogback.onrender.com";
// const url = "http://localhost:3001";

export default class ApiClient {
     constructor(tokenProvider, logoutHandler) {
        this.tokenProvider = tokenProvider;
        this.logoutHandler = logoutHandler;
      }
    
    //logout

    // Perform login request
    getLogin(username, password) {
        return axios({
            method: "POST", // Use the appropriate HTTP method
            url: `${url}/auth/login`,
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
      url: `${url}/auth/register`,
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


  getAllPosts() {
    return axios({
      method: "GET", // Use the appropriate HTTP method
      url: `${url}/post/posts`,
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      console.log(response.data);
      return response.data; // return response data
    })
    .catch(error => {
      throw error; // re-throw the error to be caught by the caller
    });
  }

  getUserPosts() {
    return axios({
      method: "GET", // Use the appropriate HTTP method
      url: `${url}/post/userPosts`,
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      console.log(response.data);
      return response.data; // return response data
    })
    .catch(error => {
      throw error; // re-throw the error to be caught by the caller
    });
  
  }

  createPost(postText, postLocation, postImage) {
    return axios({
      method: "POST", // Use the appropriate HTTP method
      url: `${url}/post/create`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        postText: postText,
        postLocation: postLocation,
        postImage: postImage,
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

  updatePost(id, postText, postLocation, postImage){
    return axios({
      method: "POST", // Use the appropriate HTTP method
      url: `${url}/post/update/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        postText: postText,
        postLocation: postLocation,
        postImage: postImage,
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

  deletePost(id) {
    return axios({
      method: "POST", // Use the appropriate HTTP method
      url: `${url}/post/delete/${id}`,
      headers: {
        "Content-Type": "application/json",
      }
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



