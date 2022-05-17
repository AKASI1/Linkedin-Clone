import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PostModel from "./PostModel";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ReactPlayer from "react-player";
import fuzzyTime from "fuzzy-time";

/*________________________________________________________________________________*/

const Main = (props) => {
  const user = useSelector((state) => state.user.value);
  const [posts, setPosts] = useState([]);
  const [showModel, setShowModel] = useState(false);

  const hideModel = () => {
    setShowModel(false);
  };

  useEffect(() => {
    const getPosts = async () => {
      const q = await query(
        collection(db, "Articles"),
        orderBy("date", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });

        setPosts(arr);
      });
    };
    getPosts();
  }, []);
  console.log(posts);
  return (
    <Container>
      <ShareBox>
        <div>
          <img
            src={user?.photoURL ? user.photoURL : "/Images/user.svg"}
            alt="user"
          />
          <button onClick={() => setShowModel(true)}>Start a post</button>
        </div>

        <div>
          <button onClick={() => setShowModel(true)}>
            <img src="/Images/photo-icon.svg" alt="pic" />
            <span>Photo</span>
          </button>

          <button onClick={() => setShowModel(true)}>
            <img src="/Images/vedio-icon.svg" alt="vedio" />
            <span>Vedio</span>
          </button>

          <button onClick={() => setShowModel(true)}>
            <img src="/Images/job-icon.svg" alt="job" />
            <span>Job</span>
          </button>

          <button onClick={() => setShowModel(true)}>
            <img src="/Images/article-icon.svg" alt="article" />
            <span>Write article</span>
          </button>
        </div>
      </ShareBox>
      {posts.length > 0 &&
        posts.map((post, id) => (
          <Article key={id}>
            <Actor>
              <a href="/feed">
                <img src={post.user.photo} alt="user" />
                <div className="info">
                  <h6 className="name">{post.user.name}</h6>
                  <span className="title">{post.user.title}</span>
                  <span className="date">{fuzzyTime(post.date.toDate())}</span>
                </div>
              </a>
              <button>
                <img src="/Images/ellipsis.svg" alt="ellipsis" />
              </button>
            </Actor>
            <Description>{post.description}</Description>
            <SharedImg>
              {post.sharedImage && <img src={post.sharedImage} alt="postIMG" />}
              {post.sharedVedio && (
                <ReactPlayer
                  url={post.sharedVedio}
                  width={"100%"}
                  controls={true}
                />
              )}
            </SharedImg>

            <SocialContents>
              <li>
                <img
                  src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                  alt="likes"
                />
                <img
                  src="https://static-exp1.licdn.com/sc/h/b1dl5jk88euc7e9ri50xy5qo8"
                  alt="clap"
                />
                <img
                  src="https://static-exp1.licdn.com/sc/h/cpho5fghnpme8epox8rdcds22"
                  alt="love"
                />
                <span>42</span>
              </li>
              <li>
                <p>{post.comments} comments </p>
              </li>
            </SocialContents>
            <SocialActions>
              <button
                onClick={(e) => {
                  e.currentTarget.classList.toggle("active");
                }}
              >
                <img className="unLiked" src="/Images/like.svg" alt="like" />
                <img
                  className="liked"
                  src="https://static-exp1.licdn.com/sc/h/5zhd32fqi5pxwzsz78iui643e"
                  alt="like"
                />

                <span>Like</span>
              </button>
              <button>
                <img src="/Images/comment.svg" alt="comment" />
                <span>Comment</span>
              </button>
              <button>
                <img src="/Images/share.svg" alt="share" />
                <span>Share</span>
              </button>
              <button>
                <img src="/Images/send.svg" alt="send" />
                <span>Send</span>
              </button>
            </SocialActions>
          </Article>
        ))}
      {showModel && <PostModel close={hideModel} addPost={setPosts} />}
    </Container>
  );
};
export default Main;

/*________________________________________________________________________________*/
const Container = styled.div`
  grid-area: main;
`;
/*_________________________________________*/
const CommonCard = styled.article`
  overflow: hidden;
  text-align: center;
  margin-bottom: 8px;
  background-color: white;
  border-radius: 5px;
  border: none;
  position: relative;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
/*_________________________________________*/
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background-color: white;

  div {
    button {
      color: rgba(0, 0, 0, 0.6);
      outline: none;
      border: none;
      background-color: transparent;
      min-height: 48px;
      line-height: 1.5;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      transition: 0.2s;
      padding: 8px;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
      }
    }

    &:last-child {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      padding-bottom: 4px;
      button {
        border-radius: 5px;
        img {
          margin: 0 10px 0 -2px;
        }
      }
    }
  }
`;
/*_________________________________________*/
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
/*_________________________________________*/
const Actor = styled.div`
  padding-right: 40px;
  padding: 12px 16px 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  align-items: flex-start;

  a {
    overflow: hidden;
    display: flex;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .info {
      text-align: start;
      h6 {
        font-size: 14px;
        color: rgba(0, 0, 0, 1);
        font-weight: 600;
      }
      span {
        font-size: 12px;
        display: block;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }
`;
/*_________________________________________*/
const Description = styled.div`
  font-size: 14px;
  text-align: start;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.9);
  overflow: hidden;
`;
/*_________________________________________*/
const SharedImg = styled.div`
  width: 100%;
  max-height: 500px;
  position: relative;
  background-color: #f9fafb;
  margin-top: 8px;
  overflow: hidden;
  img {
    max-height: 500px;
    max-width: 100%;
  }
`;
/*_________________________________________*/
const SocialContents = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0 16px;
  padding: 8px 0;
  overflow: auto;
  border-bottom: 1px solid #e9e5df;
  font-size: 12px;
  li {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      margin-right: -5px;
      background-color: white;
      border-radius: 50%;
    }
    span {
      margin-left: 8px;
    }
    &:hover {
      color: #0a66c2;
      text-decoration: underline;
    }
  }
`;
/*_________________________________________*/
const SocialActions = styled.div`
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  min-height: 40px;
  overflow: hidden;
  button {
    outline: 0;
    color: rgba(0, 0, 0, 0.6);
    padding: 12px 24px;
    background-color: transparent;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 5px;
    border: 0;
    border-radius: 5px;
    transition: 0.2s;
    font-weight: 600;
    .liked {
      display: none;
    }
    .unLiked {
      display: inline-block;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    &.active {
      color: #0a66c2;
      .liked {
        display: inline-block;
      }
      .unLiked {
        display: none;
      }
    }
    @media (max-width: 767px) {
      flex-direction: column;
      padding: 10px;
      margin: 0;
      font-size: 12px;
    }
  }
`;
/*________________________________________________________________________________*/
