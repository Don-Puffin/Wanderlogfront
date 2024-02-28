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
    async getLogin(username, password) {
        return await axios({
            method: "POST", // Use the appropriate HTTP method
            url: `${url}/auth/login`,
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              username: username,
              password: password,
            },
            withCredentials: true
        })
    .then(response => {
      console.log(response.data);
      return response.data; // return response data containing status and message
    })
    .catch(error => {
      console.error(error.response.data)
      return error.response.data; // re-throw the error to be caught by the caller
      });
  }

  async register(username, password) {
    return await axios({
      method: "POST", // Use the appropriate HTTP method
      url: `${url}/auth/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        password: password,
      },
      withCredentials: true
    })
  .then(response => {
    console.log(response.data);
    return response.data; // return response data containing status and message
  })
  .catch(error => {
    console.error(error.response.data)
    return error.response.data; // re-throw the error to be caught by the caller
  });
}

async logout() {
  console.log("apiclient function activate")
  return await axios({
    method: "POST", // Use the appropriate HTTP method
    url: `${url}/auth/logout`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
  }).then(response => {
    console.log(response.data);
    return response.data;
  }).catch(error => {
    console.error(error.response.data)
    return error.response.data; // re-throw the error to be caught by the caller
})
}


async authUser () {
  console.log("checking for cookies")
  return await axios({
    method: "POST", 
    url: `${url}/auth/auth`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
  }).then(response => {
    return response.data;
  }).catch(error => {
    throw error;
  })
}


  async getAllPosts() {
    return await axios({
      method: "GET", // Use the appropriate HTTP method
      url: `${url}/post/posts`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      return response.data; // return response data
    })
    .catch(error => {
      throw error; // re-throw the error to be caught by the caller
    });
  }

  async getUserPosts() {
    return await axios({
      method: "GET", // Use the appropriate HTTP method
      url: `${url}/post/userPosts`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      return response.data; // return response data
    })
    .catch(error => {
      throw error; // re-throw the error to be caught by the caller
    });
  
  }

  async createPost(postText, postLocation, postImage) {
    return await axios({
      method: "POST", // Use the appropriate HTTP method
      url: `${url}/post/create`,
      headers: {
        "Content-Type": "application/json",
      },
      //postLocation needs to be an object that looks like:
      //{name: "location name", lat: , long: , rating:}
      data: {
        postText: postText,
        postLocationData: postLocation,
        postImage: postImage,
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      return response.data; // return response data containing status and message
    })
    .catch(error => {
      console.error(error.response.data)
      return error.response.data; // re-throw the error to be caught by the caller
    });
  }

  async updatePost(id, rating){
    return await axios({
      method: "PUT", // Use the appropriate HTTP method
      url: `${url}/post/update/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
          rating: rating
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
    return response.data; // return response data containing status and message
    })
    .catch(error => {
      console.error(error.response.data)
      return error.response.data; // re-throw the error to be caught by the caller
    });
  }

  async deletePost(id) {
    return await axios({
      method: "DELETE", // Use the appropriate HTTP method
      url: `${url}/post/delete/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
    return response.data; // return response data containing status and message
    })
    .catch(error => {
      console.error(error.response.data)
      return error.response.data; // re-throw the error to be caught by the caller
    });
  }

  async getUserProfile() {
    return await axios({
      method: "GET", // Use the appropriate HTTP method
      url: `${url}/profile/profile`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      return response.data; // return response data
    })
    .catch(error => {
      throw error; // re-throw the error to be caught by the caller
    });
  
  }

  async getOtherProfile(id) {
    return await axios({
      method: "GET", // Use the appropriate HTTP method
      url: `${url}/profile/otherprofile/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      return response.data; // return response data
    })
    .catch(error => {
      throw error; // re-throw the error to be caught by the caller
    });
  
  }

  async editUserProfile(imageURL, bio, userLocation) {
    console.log(imageURL, bio, userLocation)
    return await axios ({
      method: "PUT",
      url: `${url}/profile/edit`,
      headers: {
        "Content-Type": "application/json",
      }, 
      data: {
        imageURL: imageURL,
        bio: bio,
        userLocation: userLocation
      },
      withCredentials: true
    }).then(response => {
      console.log(response.data);
      return response.data
    }).catch(error => {
      console.error(error.response.data)
      return error.response.data; // re-throw the error to be caught by the caller
    })
  }

  async getMapLocations(id) {
    let reqId = null
    id ? reqId = id : reqId = null
    return await axios({
      method: "GET", // Use the appropriate HTTP method
      url: `${url}/map/visitedPlaces/${reqId}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      return response.data; // return response data
    })
    .catch(error => {
      throw error; // re-throw the error to be caught by the caller
    });
  }


  async getTopRatedLocations(id) {
    return await axios({
      method: "GET", // Use the appropriate HTTP method
      url: `${url}/map/topRatedPlaces`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      return response.data; // return response data
    })
    .catch(error => {
      throw error; // re-throw the error to be caught by the caller
    });
  }
  
}



