import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL, VALIDATE_TOKEN } from "@/contexts/JWTContext";
import RouteLogin from "@/pages";

function TokenHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const validateAndStoreToken = async () => {
      const token = searchParams.get("access_token");

      if (!token || !token.trim()) {
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}${VALIDATE_TOKEN}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: token,
          }),
        });

        if (!response.ok) {
          setError(true);
        }

        const data = await response.json();
        const result = data?.result;

        if (
          result?.status === "success" &&
          result?.message === "Access token valid"
        ) {
          navigate("/dashboard");

          window.localStorage.setItem("serviceToken", token);
          window.localStorage.setItem("userData", JSON.stringify(result));
          window.localStorage.setItem("userName", result?.user_name);
        } else {
          setError(true);
        }
      } catch (err: any) {
        setError(true);
      }
    };

    validateAndStoreToken();
  }, [searchParams, navigate]);

  if (error) {
    return <RouteLogin />;
  }

  return <RouteLogin />;
}

export default TokenHandler;
