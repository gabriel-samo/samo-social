import "./login.scss";
import axios from "axios";
import notify from "../../utils/Notify";
import { useNavigate } from "react-router-dom";
import { caption } from "../register/Register";
import { loginUser } from "../../store/authSlice";
import { useAppDispatch } from "../../store/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
// import { store } from "../../redux/store";
// import { loginAction } from "../../redux/authReducer";

type formInputs = {
  username: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formInputs>();

  const onSubmit: SubmitHandler<formInputs> = (data) => {
    axios
      .post("http://localhost:3012/api/auth/login", data)
      .then((res) => {
        notify.success(res.data.msg);
        dispatch(loginUser(res.headers["authorization"]));
        navigate("/");
      })
      .catch((err) => {
        if (err.response) notify.error(err.response.data.msg);
        else notify.error(err);
      });
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            odio iusto! Illo expedita fugit incidunt, veniam laudantium. Aut.
          </p>
          <span>Don't you have na account?</span>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              id="username"
              type="text"
              placeholder="Username"
              {...register("username", {
                required: true,
                minLength: 5,
                maxLength: 15
              })}
            />
            {(errors.username?.type === "required" &&
              caption("This filed is required")) ||
              (errors.username?.type === "minLength" &&
                caption("The minimum length is 5 characters")) ||
              (errors.username?.type === "maxLength" &&
                caption("The maximum length is 15 characters"))}
            <input
              type="password"
              placeholder="Password"
              id="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 15
              })}
            />
            {(errors.password?.type === "required" &&
              caption("this filed is required")) ||
              (errors.password?.type === "minLength" &&
                caption("The minimum length is 5 characters")) ||
              (errors.password?.type === "maxLength" &&
                caption("The maximum length is 15 characters"))}
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;