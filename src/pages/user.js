import React, { useEffect, useState } from "react";
import "../../node_modules/semantic-ui-css";
import Nav2 from "../components/Nav2";
import Blog from "../components/blog";
import Card2 from "../components/blogcard";
import { useHistory } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  rootinfo,
  rootinfoDetail,
  accesstoken,
  getallpost,
  setblogs,
} from "../redux/Action/blogAction";
import "../css/error.css";

const User = () => {
  const [loading, setloading] = useState(false);
  // const openORnot = useSelector((state) => state.auser.isLogged);
  const Token = useSelector((state) => state.tokenuser);
  const blogs = useSelector((state) => state.allblogs.blogs);
  const dispatch = useDispatch();
  const hist = useHistory();
  console.log(blogs);
  const gettingtoken = async () => {
    const token = Cookies.get("refreshtoken");
    setloading(true);
    fetch(`${process.env.REACT_APP_SERVER}/user/refresh_token`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((access) => {
        console.log("AccessToken : ", access);
        dispatch(accesstoken(access.access_token));
        setloading(false);
        // rootinfo(access.access_token);

        // fetch(`${process.env.REACT_APP_SERVER}/user/myprofile`, {
        //   method: "GET",
        //   headers: {
        //     "Content-type": "application/json; charset=UTF-8",
        //     Authorization: access.access_token,
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((resp) => {
        //     console.log(resp);

        //     dispatch(rootinfoDetail(resp));
        //   })
        //   .catch((err) => {
        //     console.log(err.message);
        //   });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getting_all_blog = async () => {
    const res = await getallpost();
    dispatch(setblogs(res));
  };

  useEffect(() => {
    if (Cookies.get("refreshtoken")) {
      gettingtoken();
      getting_all_blog();
    } else if (localStorage.getItem("cookies")) {
    } else hist.push("/");
  }, []);

  const token = localStorage.getItem("cookies");

  // const gettingdata = async () => {
  //   const res = await rootinfo(token);
  //   dispatch(rootinfoDetail(res));
  // };
  // gettingdata();
  return (
    <>
      <Nav2 />
      {loading && (
        <div className="outer">
          <div className="inner">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          </div>
        </div>
      )}
      {!loading && (
        <div>
          {" "}
          <Card2 titlemenu="Recommended topics" />{" "}
        </div>
      )}

      <div className="container footer">
        <p> copyright BlueRocket | terms and conditions </p>
      </div>
    </>
  );
};
export default User;
