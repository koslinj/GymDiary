import axios from "@/config/axiosConfig";

export const removeFriend = async (friendId: number) => {
  const response = await axios.delete("/shared/deleteFriend",
    { data: { friend_id: friendId } }
  );
};

export const fetchFriendInfo = async (friendId: number) => {
  const response = await axios.get("/shared/getFriendInfo", {
    params: { friend_id: friendId }
  });
  return response.data.friendInfo;
};

export const fetchUsersToInvite = async (search: string) => {
  const response = await axios.get("/shared/getUsersToInvite", {
    params: { pattern: search }
  });
  return response.data.users;
};

export const sendInvitation = async (friendId: number) => {
  const response = await axios.post("/shared/sendInvitation",
    {
      friend_id: friendId
    }
  );
};

export const fetchPendingInvitations = async () => {
  const response = await axios.get("/shared/getPendingUsers")
  return response.data.pendingUsers;
};

export const acceptInvitation = async (friendId: number) => {
  const response = await axios.post("/shared/acceptInvitation",
    { friend_id: friendId }
  );
};
