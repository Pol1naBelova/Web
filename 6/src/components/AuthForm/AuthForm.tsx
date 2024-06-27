import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authInstance from "../../../auth.ts";
import { AuthContext } from "../../../AuthContext.tsx";

interface IMyAuthForm {
  username: string;
  password: number;
}
const AuthForm = () => {
  const [tasks, setTasks] = useState<IMyAuthForm[]>([]);
  const [error, setError] = useState("");
  const { setIsAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IMyAuthForm>({
    mode: "onBlur",
  });

  useEffect(() => {
    try {
      postUser();
    } catch (e) {
      console.log(e);
    }
  }, [tasks]);

  const saveElement: SubmitHandler<IMyAuthForm> = (data) => {
    setTasks([data]);
  };

  const navigate = useNavigate();
  const postUser = async () => {
    try {
      setIsLoading(true);
      if (tasks.length) {
        const response = await authInstance.post("auth/token/", {
          username: tasks[0].username,
          password: tasks[0].password,
        });
        console.log(response.headers["authorization"]);
        if (response) {
          localStorage.setItem("access_token", response.headers["authorization"]);
          setError("");
          console.log("hii");
          setIsAuth(true);
          return navigate("");
        }
      }
    } catch (e: any) {
      console.log(e.response.data.detail);
      setError(e.response.data.detail);
      setIsAuth(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(saveElement)}>
          <input
            {...register("username", {
              required: "Field is required",
              minLength: {
                value: 5,
                message: "More characters are needed",
              },
            })}
            type="text"
            placeholder="Username"
          />
          <div data-testid={"error-name-text"}>{errors.username?.message}</div>
          <input
            {...register("password", {
              required: "Field is required",
              minLength: {
                value: 8,
                message: "More characters are needed",
              },
            })}
            type="text"
            placeholder="Password"
          />
          <div data-testid={"error-age-text"}>{errors.password?.message}</div>
          <button data-testid={"submit-button"} disabled={!isValid} type="submit">
            Save
          </button>
        </form>
        {isLoading && <p>Loading...</p>}
        {error}
      </div>
    </>
  );
};

export default AuthForm;
