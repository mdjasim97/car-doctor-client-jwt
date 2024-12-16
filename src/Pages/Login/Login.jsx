import logPic from "../../assets/images/login/login.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../CustomHook/useAuth";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const loggedUser = result.user;

        axios.post("http://localhost:4000/jwt", { email }, { withCredentials: true })
        .then((data) => {
            console.log(data);
        });


        if (loggedUser) {
          navigate(location?.state ? location?.state : "/");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <img src={logPic} alt="" />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleUserLogin} className="card-body m-10">
              <h1 className="text-5xl text-center">Login Now</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-[#FF3811] text-white">Login</button>
              </div>

              <div>
                <h1>
                  Dont have a Account?{" "}
                  <Link to="/signup" className="font-bold text-blue-600">
                    Sign Up
                  </Link>
                </h1>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
