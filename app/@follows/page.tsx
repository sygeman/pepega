import { getCurretUser } from "@/utils/get-current-user";

import { Follows } from "./follows";
import { getFollows } from "./helpers/get-follows";

const FollowsPage = async () => {
  const user = await getCurretUser();
  const follows = await getFollows(user?.id);

  return <Follows follows={follows} />;
};

export default FollowsPage;
