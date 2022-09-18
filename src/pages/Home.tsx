import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logout } from "../firebase";
import { removeUser } from "../store/auth";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (!user) {
      toast("Please login first.", { type: "warning", autoClose: 1000 });
      navigate("/login", {
        replace: true,
      });
    }
  }, [navigate]);
  const handleLogout = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result = await logout();
    dispatch(removeUser(result));
    toast(result.message, { type: result.type as any });
    console.log("result", result);

    if (result.type !== "error") {
      navigate("/login", {
        replace: true,
      });
    }
  };
  return (
    <div className="home-container">
      <div className="home">
        <div>
          <div className="tab">
            <div className="tabItem">
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </div>
          <div className="info">Welcome {user?.email}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
