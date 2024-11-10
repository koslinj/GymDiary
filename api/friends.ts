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


export const fetchNumberOfWorkoutsChart = async (friendId: string) => {
  const friendResponse = await axios.get("/shared/numberOfWorkouts", {
    params: { friend_id: friendId }
  });
  const friendGymData = friendResponse.data.data.gym

  const myResponse = await axios.get("/shared/numberOfWorkouts");
  const myGymData = myResponse.data.data.gym
  return { friend: friendGymData, my: myGymData };
};

export const fetchDurationChart = async (friendId: string) => {
  const friendResponse = await axios.get("/gym/chart/duration", {
    params: { friend_id: friendId }
  });
  const friendData = friendResponse.data.data
  friendData.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const friendDuration = friendData.map((item: { duration: string; }) => item.duration);

  const myResponse = await axios.get("/gym/chart/duration");
  const myData = myResponse.data.data
  myData.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const myDuration = myData.map((item: { duration: string; }) => item.duration);
  return { friend: friendDuration, my: myDuration };
};

export const fetchMusclesChart = async (friendId: string) => {
  const friendResponse = await axios.get("/gym/chart/categories", {
    params: { friend_id: friendId, range: "all" }
  });
  const friendData = friendResponse.data.categories

  const myResponse = await axios.get("/gym/chart/categories", {
    params: { range: "all" }
  });
  const myData = myResponse.data.categories
  return { friend: friendData, my: myData };
};

export const fetchSetsChart = async (friendId: string) => {
  const friendResponse = await axios.get("/gym/chart/sets", {
    params: { friend_id: friendId }
  });
  const friendData = friendResponse.data.sets
  friendData.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const friendTotalSets = friendData.map((item: { totalSets: number; }) => item.totalSets);

  const myResponse = await axios.get("/gym/chart/sets");
  const myData = myResponse.data.sets
  myData.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const myTotalSets = myData.map((item: { totalSets: number; }) => item.totalSets);
  return { friend: friendTotalSets, my: myTotalSets };
};