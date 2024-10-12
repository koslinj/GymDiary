import axios from "@/config/axiosConfig";

export const fetchFriendInfo = async (friendId: string) => {
  const response = await axios.get("/shared/getFriendInfo", {
    params: { friend_id: friendId }
  });
  return response.data.friendInfo;
};
