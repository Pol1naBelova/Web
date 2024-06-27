import { useContext, useEffect, useState } from "react";
import authInstance from "../../../auth.ts";
import { AuthContext } from "../../../AuthContext.tsx";
import AuthForm from "../../components/AuthForm/AuthForm.tsx";

interface IProfile {
  email: string;
  first__name: string;
  id: number;
  is_staff: boolean;
  last_name: string;
  role: string;
  username: string;
}
const ProfilePage = () => {
  const { isAuth } = useContext(AuthContext);
  const [profile, setProfile] = useState({} as IProfile);
  const getUsers = async () => {
    const response = await authInstance.get("users/current/");
    setProfile(response.data);
    console.log(response);
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (!isAuth) return <AuthForm />;
  else
    return (
      <div>
        <h2>Profile info</h2>
        <div>
          <span>Username: {profile.username}</span>
          <span>Email: {profile.email}</span>
        </div>
      </div>
    );
};
export default ProfilePage;