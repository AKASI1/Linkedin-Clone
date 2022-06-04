import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Profile from "./Profile";

/*________________________________________________________________________________*/

const Header = (props) => {
  const user = useSelector((state) => state.user.value);
  const [showUser, setShowUser] = useState(false);

  return (
    <Container>
      {!user && <Navigate to="/" />}
      <Content>
        <Logo>
          <a href="/feed">
            <img src="/Images/home-logo.svg" alt="" />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SearchIcon>
            <img src="/Images/search-icon.svg" alt="" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <img src="/Images/nav-home.svg" alt="" />
              <span>Home</span>
            </NavList>

            <NavList>
              <img src="/Images/nav-network.svg" alt="" />
              <span>My Network</span>
            </NavList>

            <NavList>
              <img src="/Images/nav-jobs.svg" alt="" />
              <span>Jobs</span>
            </NavList>

            <NavList>
              <img src="/Images/nav-messaging.svg" alt="" />
              <span>Messaging</span>
            </NavList>

            <NavList>
              <img src="/Images/nav-notifications.svg" alt="" />
              <span>Notifications</span>
            </NavList>

            <User onClick={() => setShowUser(!showUser)}>
              {user && user.photoURL ? (
                <img src={user.photoURL} alt="user" />
              ) : (
                <img src="/Images/user.svg" alt="user" />
              )}
              <span>
                Me
                <img src="/Images/down-icon.svg" alt="" />
              </span>
              {showUser && <Profile />}
            </User>

            <Work>
              <img src="/Images/nav-work.svg" alt="" />
              <span>
                Work
                <img src="/Images/down-icon.svg" alt="" />
              </span>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};
export default Header;

/*________________________________________________________________________________*/

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;
/*___________________________________________________*/
const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;
/*___________________________________________________*/
const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
  @media (max-width: 365px) {
    width: 10px;
  }
`;
/*___________________________________________________*/
const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
      @media (max-width: 767px) {
        width: 205px;
      }
    }
  }
  @media (max-width: 365px) {
    margin-left: 25px;
  }
`;
/*___________________________________________________*/
const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
/*___________________________________________________*/
const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;

    /* box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 6px 9px rgb(0 0 0 / 20%); */
  }
`;
/*___________________________________________________*/
const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  justify-content: space-evenly;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
      @media (max-width: 768px) {
        border: none;
      }
    }
  }
`;
/*___________________________________________________*/
const NavList = styled.li`
  justify-content: center;
  display: flex;
  align-items: center;
  background: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  line-height: 1.5;
  min-height: 52px;
  min-width: 80px;
  position: relative;
  text-decoration: none;
  span {
    color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
  }
  @media (max-width: 768px) {
    min-width: 70px;
    font-size: 10.5px;
  }

  &:hover,
  &:active {
    span {
      color: rgba(0, 0, 0, 1);
    }
  }
`;

const User = styled(NavList)`
  svg {
    width: 24px;
    border-radius: 50%;
  }
  img:first-of-type {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }
  img:last-child {
    width: fit-content;
    height: fit-content;
  }
  @media (max-width: 767px) {
    position: fixed;
    top: 5px;
    right: 0px;
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  img:last-child {
    width: fit-content;
    height: fit-content;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
/*________________________________________________________________________________*/
