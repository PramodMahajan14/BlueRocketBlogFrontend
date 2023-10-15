import { ActionTypes } from "../contants/blogActionType";
import axios from "axios";

var current_user = {};
export const loginuser = () => {
  return {
    type: ActionTypes.LOGIN,
  };
};

export const accesstoken = (token) => {
  return {
    type: ActionTypes.GET_TOKEN,
    payload: token,
  };
};

// export const rootinfo = async (token) => {
//   try {
//     const config = {
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         Authorization: token,
//       },
//     };
//     const res = await axios.get(
//       `${process.env.REACT_APP_SERVER}/user/myprofile`,
//       config
//     );
//     // fetch(`${process.env.REACT_APP_SERVER}/user/myprofile`, {
//     //   method: "GET",
//     //   headers: {
//     //     "Content-type": "application/json; charset=UTF-8",
//     //     Authorization: token,
//     //   },
//     // })
//     //   .then((response) => response.json())
//     //   .then((data) => {
//     //     data;
//     //   })
//     //   .catch((err) => {
//     //     console.log(err.message);
//     //   });
//     console.log(res.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

export const allinfo = async () => {
  const res = await axios.get(`${process.env.REACT_APP_SERVER}/user/profile`);
  return res;
};

export const rootinfoDetail = (res) => {
  console.log(res);
  return {
    type: ActionTypes.GET_ROOTINFO,
    payload: {
      ruserinfo: res.data,
      // rootuser: true,
    },
  };
};

export const alluserinfo = (res) => {
  return {
    type: ActionTypes.GET_ALL_USER_INFO,
    payload: {
      alluser: res.data,
    },
  };
};

export const updateAvatar = (res) => {
  return {
    type: ActionTypes.UPDATE_AVATAR,
    payload: {
      ruserinfo: res,
    },
  };
};

export const getallpost = async () => {
  const res = await axios.get(`${process.env.REACT_APP_SERVER}/user/getpost`);
  console.log(res);
  return res.data;
};

export const setblogs = (blogs) => {
  return {
    type: ActionTypes.SET_BLOGS,
    payload: blogs,
  };
};

export const selectedblog = (blog) => {
  return {
    type: ActionTypes.SELECTED_BLOG,
    payload: blog,
  };
};

export const closebutton = () => {
  return {
    type: ActionTypes.SET_CLOSE,
    payload: {
      closebutton: true,
    },
  };
};
