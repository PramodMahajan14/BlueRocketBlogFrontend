import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Nav2css.css";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  rootinfo,
  rootinfoDetail,
  accesstoken,
} from "../redux/Action/blogAction";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
const profile =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
const Menu = () => {
  const [root, setroot] = useState([]);
  const [showText, setShowText] = useState(false);
  const Token = useSelector((state) => state.tokenuser);
  const dispatch = useDispatch();
  console.log(Token);

  const UserData = async (Token) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: Token,
        },
      };
      const resp = await axios.get(
        `${process.env.REACT_APP_SERVER}/user/myprofile`,
        config
      );
      dispatch(rootinfoDetail(resp));
      setroot(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // if (Cookies.get("refreshtoken")) {
    //   gettingtoken();
    // } else if (localStorage.getItem("cookies")) {
    // } else hist.push("/");
    UserData(Token);
  }, [true]);
  //   const root = useSelector((state) => state.auser.ruserinfo);
  console.log(root);
  const OpenMenu = () => {
    if (showText === false) {
      setShowText(true);
    } else {
      setShowText(false);
    }
  };
  const closemenu = () => setShowText(false);

  const handlelogout = async () => {
    try {
      await axios.get("/user/logout");
      // localStorage.removeItem("cookies");
      // localStorage.removeItem("firstLogin");
      // console.log("logout");
      Cookies.remove("refreshtoken");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      window.location.href = "/";
    }
  };
  return (
    <>
      <div className="action">
        <img
          class="ui  avatar image"
          name="pramod mahajakn"
          onClick={OpenMenu}
          src={root.avatar}
          alt="profile"
        />
        <span>
          <i className="angle down icon"></i>
        </span>
        <div className={showText ? "menu active" : "menu"}>
          <h3 className="user id">{root.userid}</h3>
          <p className="rootemail">{root.email}</p>
          <div className="ui divider"></div>
          <ul onClick={closemenu}>
            <li>
              <Link to={"/user/profile"}>
                <a>
                  {" "}
                  <i className="user circle  icon"></i>My profile
                </a>
              </Link>
            </li>
            <li>
              {" "}
              <Link to={"/createblog"}>
                <a>
                  <i className="pencil alternate icon"></i>Create Blog
                </a>
              </Link>
            </li>
            <li>
              <Link to={"/mybloglist"}>
                <a>
                  <i class="folder icon"></i>List
                </a>
              </Link>
            </li>
            <li>
              <a onClick={handlelogout}>
                <i className="sign-out icon"></i>logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Menu;
