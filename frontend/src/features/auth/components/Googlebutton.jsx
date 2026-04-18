import { GoogleLogin } from "@react-oauth/google";
import useGoogleAuth from "../hooks/useGoogleAuth";


// Usage: <GoogleButton onSuccess={(user) => console.log(user)} />
const GoogleButton = ({ onSuccess }) => {
  const { handleGoogleSuccess, handleGoogleError, loading, error } = useGoogleAuth();

  const onGoogleSuccess = async (credentialResponse) => {
    const user = await handleGoogleSuccess(credentialResponse);
    if (user && onSuccess) {
      onSuccess(user);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <p className="text-red-500 text-sm text-center mb-2">{error}</p>
      )}

      {loading ? (
        <div className="text-center text-sm text-gray-500">Signing in...</div>
      ) : (
        <GoogleLogin
          onSuccess={onGoogleSuccess}
          onError={handleGoogleError}
          width="100%"
          text="continue_with"
          shape="rectangular"
          theme="outline"
        />
      )}
    </div>
  );
};

export default GoogleButton;