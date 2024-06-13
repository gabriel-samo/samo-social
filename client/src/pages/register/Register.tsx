import "./register.scss";
import notify from "../../utils/Notify";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { makeRequest } from "../../utils/makeRequest";

type formInputs = {
  username: string;
  email: string;
  password: string;
  name: string;
};

export const caption = (msg: string) => {
  return (
    <p style={{ marginTop: "-10px", fontSize: "12px", color: "red" }}>{msg}</p>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formInputs>();

  const onSubmit: SubmitHandler<formInputs> = (data) => {
    makeRequest()
      .post("/auth/register", data)
      .then((res) => {
        notify.success(res.data.msg);
        navigate("/login");
      })
      .catch((err) => {
        notify.error(err.response.data.msg);
      });
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Samo Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            odio iusto! Illo expedita fugit incidunt, veniam laudantium. Aut.
          </p>
          <span>Do you have na account?</span>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
        <div className="right">
          <h1>Register</h1>
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
              type="email"
              placeholder="Email"
              id="email"
              {...register("email", {
                required: true,
                minLength: 5,
                maxLength: 20
              })}
            />
            {(errors.email?.type === "required" &&
              caption("this filed is required")) ||
              (errors.email?.type === "minLength" &&
                caption("The minimum length is 5 characters")) ||
              (errors.email?.type === "maxLength" &&
                caption("The maximum length is 20 characters"))}
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
            <input
              type="text"
              placeholder="Name"
              id="name"
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 15
              })}
            />
            {(errors.name?.type === "required" &&
              caption("this filed is required")) ||
              (errors.name?.type === "minLength" &&
                caption("The minimum length is 5 characters")) ||
              (errors.name?.type === "maxLength" &&
                caption("The maximum length is 15 characters"))}
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
