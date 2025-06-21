import { useState } from "react";
import { object, string } from "zod";

const loginSchema = object({
  email: string().email("Invalid Email Address"),
  password: string().min(8, "Password must be atleast 8 characters"),
});

const Login = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  //   const handelEmailChange = (e) => {
  //     setEmail(e.target.value);
  //   };
  //   console.log({ email, password });

  const handleChange = (e) => {
    //    const name = e.target.name;
    //    const value = e.target.value;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handelLoginSubmit = (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const errorField = result.error.formErrors.fieldErrors;
      setError(errorField);
      return;
    }
    //api call
    // console.log({ email, password });
    console.log(formData);
  };
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 flex justify-center items-center min-h-screen w-full">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-white/80">Sign in to your account</p>
            </div>

            <form onSubmit={handelLoginSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/80 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  // type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
                <p className="text-red-600 text-sm">{error && error.email}</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white/80"
                  >
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  type="password"
                />
                <p className="text-red-600 text-sm">
                  {error && error.password}
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className={`cursor-pointer w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg transition-all duration-200 'hover:shadow-purple-500/20'}`}
                >
                  {"Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
