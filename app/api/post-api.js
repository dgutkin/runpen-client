
const serverUrl = process.env.SERVER_URL || "http://127.0.0.1:8080";

async function getPostsFromDB(currentUser, entryId) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/get-posts" + `?entryId=${entryId}`;

    const entries = await fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });

    return entries;

}

async function addPostToDB(currentUser, post) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(post)
    }

    const url = serverUrl + "/add-post";

    const response = await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });

    return response;

}

async function deletePostFromDB(currentUser, postId) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = serverUrl + "/delete-post" + `?postId=${postId}`;

    const response = await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });

    return response;

}

async function updatePostToDB(currentUser, post) {

    const token = await currentUser.getIdToken();

    const options = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(post)
    }

    const url = serverUrl + "/update-post";

    const response = await fetch(url, options)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.log(error);
      });

    return response;

}

export { 
    getPostsFromDB, 
    addPostToDB, 
    deletePostFromDB,
    updatePostToDB
};
