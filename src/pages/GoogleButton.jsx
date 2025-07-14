import {FaGoogle} from "react-icons/fa"

const GoogleButton = ({ onClick, label = "Sign in with Google" }) => {
    return (
      <button
        onClick={onClick}
        className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition duration-300"
      >
        <FaGoogle className="text-red-500 w-5 h-5 mr-2" />
        {label}
      </button>
    );
  };
  

export default GoogleButton;
