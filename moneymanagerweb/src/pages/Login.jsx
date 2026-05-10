import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import Input from "../components/Input.jsx";
import {validateEmail, validatePassword} from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import {AppContext} from "../context/AppContext.jsx";
import {LoaderCircle} from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {setUser}=useContext(AppContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // stop entire webpage reloading

        setIsLoading(true);
        //basic validation
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            setIsLoading(false);
            return;
        }

        if (!password.trim()) {
            setError("Password is required");
            setIsLoading(false);
            return;
        }

        setError(null);

        //Login API
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN,{
                email,
                password
            });

            const {token,user}=response.data;
            if (token) {
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        }catch (e) {
            if(e.response && e.response.data.message)
            {
                setError(e.response.data.message);
            }
            else {
                console.error("Login error:", e);
                setError("Something went wrong. Please try again.");
            }


        }finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/*Background */}
            <img src={assets.create_acc_bg}
                 alt="Background"
                 className="absolute inset-0 w-full h-full object-cover object-center"/>


            <div className="absolute inset-0 bg-black/30"></div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-lg px-6">
                <div
                    className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/30">

                    <h3 className="text-3xl font-bold text-gray-800 text-center mb-2">
                        Welcome Back 👋
                    </h3>
                    <p className="text-sm text-slate-600 text-center mb-8">
                        Log in to continue managing your finances
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <Input value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               label="Email Address"
                               placeholder="john@email.com"
                               type="text"/>

                        {/* Password */}
                        <Input value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               label="Password"
                               placeholder="Enter your password"
                               type="password"/>


                        {error && (
                            <p className="text-red-700 text-sm text-center bg-red-100 p-2 rounded-md">
                                {error}
                            </p>
                        )}
                        {/* Button */}
                        <button
                            disabled={isLoading}
                            className={`w-full py-3 text-lg font-semibold bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${isLoading ? 'bg-green-400 cursor-not-allowed opacity-70':'bg-green-600 hover:bg-green-700 hover:shadow-lg active:scale-[0.98]'}text-white`}
                            type="submit">{isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-4 h-4"/>
                                    Logging in...
                                </>
                        ) :(
                            "Login"

                        )}
                        </button>
                        {/* SignUp link */}
                        <p className="text-sm text-gray-700 text-center mt-4">
                            Don’t have an account?{" "}
                            <Link to="/signup"
                                  className="font-semibold text-green-600 hover:underline">Sign up</Link>
                        </p>
                    </form>

                </div>

            </div>

        </div>
    )
}

export default Login;