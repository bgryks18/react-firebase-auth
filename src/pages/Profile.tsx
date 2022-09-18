import React, { useId, useState, useEffect } from "react";
import firebase, {
  saveInformations,
  logout,
  saveEmail,
  savePhoneNumber,
} from "../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store/auth";
import { useNavigate } from "react-router";
import { removeUser } from "../store/auth";
function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

  const displayNameId = useId();
  const phoneNumberId = useId();
  const photoURLId = useId();
  const emailId = useId();
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
  useEffect(() => {
    if (!user) {
      toast("Please login first.", {
        type: "warning",
        autoClose: 1000,
      });
      navigate("/login", {
        replace: true,
      });
    }
  }, [navigate]);

  const handleSaveInformations = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result = await saveInformations({
      displayName,
      photoURL,
      phoneNumber,
    });

    toast(result.message, { type: result.type as any });
    if (result.type !== "error") {
      dispatch(updateUser(result?.user));
    }
  };

  const handleSaveEmail = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result = await saveEmail(email);

    toast(result.message, { type: result.type as any });
    if (result.type !== "error") {
      dispatch(updateUser(result?.user));
    }
  };
  const handleSavePhone = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result = await savePhoneNumber(phoneNumber);

    toast(result.message, { type: result.type as any });
    if (result.type !== "error") {
      dispatch(updateUser(result?.user));
    }
  };
  return (
    <div className="home-container">
      <div className="home">
        <div>
          <div className="tab">
            <div className="tabItem">
              <Link to="/profile">Profile</Link>
            </div>
            <div className="tabItem">
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </div>
          <div className="info">
            <form onSubmit={handleSaveInformations}>
              <h3>Update your profile</h3>
              <div className="form-control">
                <label htmlFor={displayNameId}>Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  id={displayNameId}
                  value={displayName}
                  onChange={(e: any) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label htmlFor={photoURLId}>Photo Url</label>
                <input
                  type="url"
                  name="photo"
                  id={photoURLId}
                  value={photoURL}
                  onChange={(e: any) => setPhotoURL(e.target.value)}
                />
              </div>
              <div className="form-control">
                <button type="submit" className="small">
                  Save
                </button>
              </div>
            </form>
            <hr />
            <form onSubmit={handleSaveEmail}>
              <h3>Update your e-mail</h3>
              <div className="form-control">
                <label htmlFor={email}>E-mail Address</label>
                <input
                  type="text"
                  name="email"
                  id={emailId}
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <button type="submit" className="small">
                  Save
                </button>
              </div>
            </form>
            <hr />
            <form onSubmit={handleSavePhone}>
              <h3>Update your phone</h3>
              <div className="form-control">
                <label htmlFor={phoneNumberId}>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  id={phoneNumberId}
                  value={phoneNumber}
                  onChange={(e: any) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="form-control">
                <button type="submit" className="small">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
