import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./store/hooks/hooks";
import { login } from "./store/features/authSlice";

const Signin = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    phone: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    try {
      if (form.phone === "" || form.password === "") return;
      const response = await axios.post(
        "http://41.90.106.13:5080/api/auth/login/by-phone",
        form
      );

      const { data } = response.data;

      console.log(data);

      dispatch(login(data.user));

      localStorage.setItem("token", data.api.token);
      navigate("/my-business")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="my-5 text-2xl font-bold">Sign in</h1>
      <form
        action=""
        className="flex flex-col gap-4 border-2 border-gray-300 p-8 rounded-md"
        onSubmit={handleSubmit}
      >
        <input
          type="number"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
            name="phone"
          className="border border-gray-300 px-4 py-2 rounded-md "
        />
        <input
          type="password"
            value={form.password}
            onChange={handleChange}
          placeholder="Password"
          name="password"
          className="border border-gray-300 px-4 py-2 rounded-md"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Signin;
