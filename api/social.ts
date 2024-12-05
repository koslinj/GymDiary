import axios from "@/config/axiosConfig";

export const addComment = async (postId: number, newComment: string) => {
  const response = await axios.post("/shared/comment",
    {
      post_id: postId,
      description: newComment,
    }
  );
}

export const addPost = async (workoutId: number, desc: string) => {
  const response = await axios.post("/shared/post",
    {
      gym_workout_id: workoutId,
      run_workout_id: null,
      description: desc,
    }
  );
};

export const deletePost = async (id: number) => {
  const response = await axios.delete("/shared/post",
    {
      data: {
        post_id: id,
      },
    }
  );
  return response
};

export const getAllPostsInfinite = async (
  pageParam: number = 1,
  search: string
) => {
  const response = await axios.get("/shared/post/getAll", {
    params: {
      page: pageParam,
      pattern: search
    },
  });
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
