// const logInUser = (userCredentials) => {
//   fetch("https://cerv-api.herokuapp.com/users/login", {
//     method: "POST",
//     headers: {
//       "content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(userCredentials),
//   })
//     .then(async (res) => {
//       const resData = await res.json();
//       console.log(resData);
//       if (resData.status === 0) {
//         return window.alert(resData.ErrorDescription || resData.message);
//       }
//       localStorage.setItem("user-info", JSON.stringify(resData));
//       return window.alert(resData.message);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// export default logInUser;
