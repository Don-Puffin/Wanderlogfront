import axios from "axios";
const url = "https://wanderlogback.onrender.com";
// const url = "http://localhost:3001";

export default class ApiClient {
     constructor(tokenProvider, logoutHandler) {
        this.tokenProvider = tokenProvider;
        this.logoutHandler = logoutHandler;
      }
    

    async getLogin(username, password) {
        return await axios({
            method: "POST",
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
      return response.data; 
    })
    .catch(error => {
      console.error(error.response.data)
      return error.response.data; 
      });
  }

  async register(username, password) {
    return await axios({
      method: "POST", 
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
    return response.data; 
  })
  .catch(error => {
    console.error(error.response.data)
    return error.response.data; 
  });
}

async logout() {
  return await axios({
    method: "POST", 
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
    return error.response.data; 
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
      method: "GET",
      url: `${url}/post/posts`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      throw error; 
    });
  }

  async getUserPosts() {
    return await axios({
      method: "GET", 
      url: `${url}/post/userPosts`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      return response.data; 
    })
    .catch(error => {
      throw error; 
    });
  
  }

  async createPost(postText, postLocation, postImage) {
    return await axios({
      method: "POST", 
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
      return response.data; 
    })
    .catch(error => {
      console.error(error.response.data)
      return error.response.data; 
    });
  }

  async updatePost(id, rating){
    return await axios({
      method: "PUT", 
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
    return response.data; 
    })
    .catch(error => {
      console.error(error.response.data)
      return error.response.data; 
    });
  }

  async deletePost(id) {
    return await axios({
      method: "DELETE",
      url: `${url}/post/delete/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
    return response.data; 
    })
    .catch(error => {
      console.error(error.response.data)
      return error.response.data; 
    });
  }

  async getUserProfile() {
    return await axios({
      method: "GET", 
      url: `${url}/profile/profile`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      return response.data; 
    })
    .catch(error => {
      throw error; 
    });
  
  }

  async getOtherProfile(id) {
    return await axios({
      method: "GET", 
      url: `${url}/profile/otherprofile/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      return response.data; 
    })
    .catch(error => {
      throw error; 
    });
  
  }

  async editUserProfile(imageURL, bio, userLocation) {
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
      return error.response.data; 
    })
  }

  async getMapLocations(id) {
    let reqId = null
    id ? reqId = id : reqId = null
    return await axios({
      method: "GET", 
      url: `${url}/map/visitedPlaces/${reqId}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      return response.data; 
    })
    .catch(error => {
      throw error; 
    });
  }


  async getTopRatedLocations(id) {
    return await axios({
      method: "GET", 
      url: `${url}/map/topRatedPlaces`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      return response.data; 
    })
    .catch(error => {
      throw error; 
    });
  }
  
}



