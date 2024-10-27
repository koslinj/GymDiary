import axios from "@/config/axiosConfig";

export const getAllPosts = async () => {
  const response = await axios.get("/shared/post/getAll");
  return response.data
};

export const likePost = async (post_id: number) => {
  const response = await axios.post("/shared/like", { post_id: post_id });
};

export const unlikePost = async (post_id: number) => {
  const response = await axios.post("/shared/like/unlike", { post_id: post_id });
};

export const getComments = async (postId: number) => {
  const response = await axios.get("/shared/comment/getAll", {
    params: {
      post_id: postId,
    },
  });

  return response.data
};
