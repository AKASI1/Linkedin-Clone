import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../App/user-slice";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

/*________________________________________________________________________________*/

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const signOutHandler = async () => {
    await auth.signOut();
    dispatch(signOut());
    navigate("/");
  };

  return (
    <Container className="container">
      <div className="about">
        <img
          className="pic"
          src={user?.photoURL ? user.photoURL : "/Images/user.svg"}
          style={{
            fontSize: "27px",
            width: "55px",
            height: "55px",
            marginRight: "5px",
          }}
          alt="user"
        />
        <div className="info">
          <h4>{user?.displayName}</h4>
          <p>{user?.email}</p>
        </div>
      </div>
      <article onClick={signOutHandler}>
        <p>Sign Out</p>
      </article>
    </Container>
  );
};
export default Profile;

/*________________________________________________________________________________*/

const Container = styled.article`
  position: absolute;
  top: 60px;
  right: 3px;
  width: fit-content;
  width: 270px;
  padding: 0;
  background-color: white;
  animation: fadeIn 0.3s;
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 6px 9px rgb(0 0 0 / 20%);

  .about {
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-top: 5px;
    h4 {
      font-size: 14px;
    }
  }

  .pic {
    height: 60px;
    width: 60px;
  }
  .about p {
    font-size: 13px;
    padding-top: 5px;
  }
  article {
    width: 100%;
    border-radius: 0;
    border: none;
    border-top: 1px solid #eee;
    margin-top: 10px;
    margin-bottom: 0;
    padding: 10px;
    cursor: pointer;
    font-size: 14px;
    color: #777;
    &:hover {
      text-decoration: underline;
    }
  }
`;
/*________________________________________________________________________________*/
