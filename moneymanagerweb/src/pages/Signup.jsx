import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import Input from "../components/Input.jsx";
import {validateEmail, validatePassword} from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import {LoaderCircle} from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../util/uploadProfileImage.js";

const Signup = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const[profilePhoto, setProfilePhoto] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImgUrl="";
        setIsLoading(true);

        //basic validations
        if (!fullName.trim()) {
            setError("Please enter your full name.");
            setIsLoading(false);
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            setIsLoading(false);
            return;
        }
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            setIsLoading(false);
            return;
        }
        setError(null);
        console.log("Fullname: " + fullName + " " + "Email: " + email + " " + "Password: " + password);

        //Signup API
        try {
            //upload image if present
            if(profilePhoto) {
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImgUrl = imageUrl || "";

            }
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER,{
                fullName,
                email,
                password,
                profileImgUrl
            })

            if (response.status === 201) {
                toast.success("Account created successfully 🎉");
                navigate("/login");
            }

        }catch (e) {
            console.error("Signup error:", e);
            setError("Something went wrong. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/*Background */}
            <img src={assets.create_acc_bg}
                 alt="Background"
                 className="absolute inset-0 w-full h-full object-cover object-center"/>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-lg px-6">
                <div
                    className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/30">

                    <h3 className="text-3xl font-bold text-gray-800 text-center mb-2">
                        Create Account
                    </h3>
                    <p className="text-sm text-slate-600 text-center mb-5">
                        Start tracking your spending today 💸
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Inputs */}
                        <div className="flex justify-center mb-6">
                            <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Input value={fullName}
                                   onChange={(e) => setFullName(e.target.value)}
                                   label="Full Name"
                                   placeholder="John Doe"
                                   type="text"/>
                            <Input value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   label="Email Address"
                                   placeholder="john@email.com"
                                   type="text"/>
                            <div className="col-span-2">
                                <Input value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       label="Password"
                                       placeholder="Enter your password"
                                       type="password"/>
                            </div>


                        </div>
                        {error && (
                            <p className="text-red-700 text-sm text-center bg-red-100 border border-red-200 px-3 py-2 rounded-md">
                                {error}
                            </p>
                        )}
                        {/* Button */}
                        <button
                            disabled={isLoading} className={`w-full py-3 text-lg font-semibold bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${isLoading ? 'bg-green-400 cursor-not-allowed opacity-70':'bg-green-600 hover:bg-green-700 hover:shadow-lg active:scale-[0.98]'}text-white`}type="submit">{isLoading?
                            (
                                <>
                                    <LoaderCircle className="animate-spin w-4 h-4"/>
                                    Creating Account...
                                </>
                            ) : (
                                "Create Account"
                            )
                        }
                        </button>
                        {/* Login link */}
                        <p className="text-sm text-gray-700 text-center mt-4">
                            Already have an account?{" "}
                            <Link to="/login"
                                  className="font-semibold text-green-600 hover:underline">Login</Link>
                        </p>
                    </form>

                </div>

            </div>

        </div>

    )

}

export default Signup;