
import { Link } from 'react-router-dom';
import signupPic from '../../assets/images/login/login.svg'
import useAuth from '../../CustomHook/useAuth';
const SignUp = () => {

    const {createUser} = useAuth()

    const handleUserCreate = (e) => {
        e.preventDefault()

        const form = e.target
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const user = {name, email, password}
        console.log(user)

        createUser(email,  password)
        .then(result => {
            console.log(result.user)
        })
        .catch(error=> console.log(error))
    }


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <img src={signupPic} alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl m-10 bg-base-100">
                        <form onSubmit={handleUserCreate} className="card-body p-10">
                            <h1 className='text-5xl text-center'>SignUp </h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#FF3811] text-white">Sign Up</button>
                            </div>

                            <div className='flex justify-center'>
                                <h1>Alredy hand an account? <Link to="/login" className='text-blue-600 font-bold'>Login</Link></h1>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;