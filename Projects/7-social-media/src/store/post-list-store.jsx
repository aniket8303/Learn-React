import { useReducer } from "react";
import { PostList } from "./post-list-context";

const postListReducer = (currPostList, action) => {
  switch (action.type) {
    case "ADD_POST":
      return [action.post, ...currPostList];
    case "DELETE_POST":
      return currPostList.filter((post) => post.id !== action.postId);
    default:
      return currPostList;
  }
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST,
  );

  const addPost = (post) => {
    dispatchPostList({ type: "ADD_POST", post });
  };

  const deletePost = (postId) => {
    dispatchPostList({ type: "DELETE_POST", payload: { postId } });
  };

  return (
    <PostList.Provider
      value={{
        postList,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Mumbai",
    body: "Hi Friends, I am going to Mumbai for my vacations. Hope too enjoy a lot. Peace out.",
    reactions: 2,
    userId: "user-9",
    tags: ["vacation", "Mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "Pass ho bhai",
    body: "4 saaal ki masti ke baad bhi ho gaye haiin pass. Hard to believe.",
    reactions: 15,
    userId: "user-12",
    tags: ["Graduating", "Unbelievable"],
  },
];

export default PostListProvider;
