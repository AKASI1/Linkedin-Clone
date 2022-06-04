import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PostModel from "./PostModel";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import ReactPlayer from "react-player";
import fuzzyTime from "fuzzy-time";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Comment from "./Comment";

/*________________________________________________________________________________*/

const Main = () => {
  const user = useSelector((state) => state.user.value);
  const [posts, setPosts] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [showComments, setShowComments] = useState([]);
  const [showEditPost, setShowEditPost] = useState(false);
  const [load, setLoad] = useState("");

  const hideModel = () => {
    setShowModel(false);
  };

  const uploadPost = useCallback(
    (post) => {
      // Upload File.
      const storageRef = ref(
        storage,
        post.image ? `images/${post.image.name}` : `vedios/${post.vedio.name}`
      );
      const upload = uploadBytesResumable(
        storageRef,
        post.image ? post.image : post.vedio
      );

      // Listen for state changes, errors, and completion.
      upload.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoad(progress);
          if (snapshot.state === "RUNNING") {
            setLoad(progress);
          }
        },
        (error) => {
          console.log(error.code);
        },
        async () => {
          const url = await getDownloadURL(upload.snapshot.ref);
          // Add to DataBase
          await addDoc(collection(db, "Articles"), {
            user: {
              name: user.displayName,
              title: user.email,
              photo: user.photoURL,
            },
            date: Timestamp.now(),
            sharedImage: post.image ? url : "",
            sharedVedio: post.vedio ? url : "",
            description: post.text,
            comments: [],
            likes: [],
          });
          setLoad();
        }
      );
    },
    [user]
  );

  useEffect(() => {
    const getPosts = async () => {
      const q = await query(
        collection(db, "Articles"),
        orderBy("date", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          arr.push({ post: doc.data(), postID: doc.id });
        });

        setPosts(arr);
      });
    };
    getPosts();
  }, [uploadPost]);

  // Implent Like and unLike
  const fetchLikes = (postId, likes) => {
    updateDoc(doc(db, "Articles", postId), {
      likes: likes.some((l) => l.email === user.email)
        ? likes.filter((l) => l.email !== user.email)
        : [
            { name: user.displayName, email: user.email, photo: user.photoURL },
            ...likes,
          ],
    });
  };

  // Delete Post
  const deletePost = (postID) => {
    deleteDoc(doc(db, "Articles", postID));
  };

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

      {load && (
        <UploadingBox>
          <img src="/Images/vedio.svg" alt="vedio" />
          <div className="info">
            <span>Uploading...</span>
            <div className="progress">
              <span>0</span>
              <div className="bar">
                <span style={{ width: load + "%" }} width={"50%"}></span>
              </div>
              <span>100</span>
            </div>
          </div>
          <img src="/Images/ellipsis.svg" alt="ellipsis" />
        </UploadingBox>
      )}

      {posts.length > 0 &&
        posts.map(({ post, postID }, id) => (
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
              <button
                onClick={() =>
                  setShowEditPost((prev) => (prev === postID ? null : postID))
                }
              >
                <img src="/Images/ellipsis.svg" alt="ellipsis" />
              </button>
              {showEditPost === postID && (
                <EditModel>
                  <li>
                    <img src="/Images/firebase.png" alt="saved" />
                    <div className="info">
                      <h6>Save</h6>
                      <span>Save for later</span>
                    </div>
                  </li>
                  {post.user.title === user.email && (
                    <li onClick={() => deletePost(postID)}>
                      <img src="/Images/delete.svg" alt="" />
                      <h6>Delete post</h6>
                    </li>
                  )}
                </EditModel>
              )}
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
                {post.likes.length > 0 && (
                  <img
                    src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                    alt="likes"
                  />
                )}
                <span>{post.likes.length}</span>
              </li>
              <li onClick={() => setShowComments((prev) => [...prev, id])}>
                <p>{post.comments ? post.comments.length : 0} comments </p>
              </li>
            </SocialContents>
            <SocialActions>
              <button
                className={
                  post.likes.some((l) => l.email === user.email) ? "active" : ""
                }
                onClick={(e) => {
                  fetchLikes(postID, post.likes);
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
              <button onClick={() => setShowComments((prev) => [...prev, id])}>
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
            {showComments.includes(id) && (
              <Comment
                photo={user?.photoURL}
                comments={post.comments}
                user={user}
                postID={postID}
              />
            )}
          </Article>
        ))}
      {showModel && (
        <PostModel
          close={hideModel}
          addPost={setPosts}
          uploadPost={uploadPost}
        />
      )}
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
const UploadingBox = styled(CommonCard)`
  text-align: start;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  color: rgba(0, 0, 0, 0.7);
  position: relative;
  & > img {
    width: fit-content;
  }
  .progress {
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 400px;
    .bar {
      width: 100%;
      height: 8px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.08);
      overflow: hidden;
      position: relative;
      span {
        position: absolute;
        height: 100%;
        background-color: #576779;
      }
    }
    @media (max-width: 768px) {
      width: 230px;
    }
  }
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
  position: relative;
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
    padding: 5px;
    border-radius: 50px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;
/*_________________________________________*/
const EditModel = styled.ul`
  animation: fadeIn 0.5s;
  text-align: start;
  position: absolute;
  right: 5px;
  top: 55px;
  background-color: white;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 6px 9px rgb(0 0 0 / 20%);
  border-radius: 8px;
  overflow: hidden;
  z-index: 99;
  min-width: 250px;
  li {
    display: flex;
    padding: 10px;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    img {
      width: 18px;
      height: 20px;
    }
    h6 {
      font-size: 14px;
      color: rgba(0, 0, 0, 1);
      font-weight: 600;
    }
    .info {
      text-align: start;
      span {
        font-size: 12px;
        display: block;
        color: rgba(0, 0, 0, 0.6);
      }
    }
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
