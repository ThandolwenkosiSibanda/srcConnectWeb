import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";

const EmailVerification = () => {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          setError(error.message);
          console.error("Error fetching user:", error);
          setLoading(false);
          return;
        }

        if (data?.user) {
          const firstName = data.user.user_metadata?.first_name || "";
          const lastName = data.user.user_metadata?.last_name || "";
          setDisplayName(`${firstName} ${lastName}`.trim());
        } else {
          setError("No user found.");
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <NavBar />

      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        {loading ? (
          <p style={{ fontSize: "1rem", color: "#4a5568" }}>
            🔄 Verifying your email...
          </p>
        ) : error ? (
          <>
            <h4 style={{ color: "#e53e3e", marginBottom: "1rem" }}>
              ❌ Verification Failed
            </h4>
            <p
              style={{
                fontSize: "0.9rem",
                maxWidth: "500px",
                color: "#c53030",
              }}
            >
              {error}
            </p>
            <p
              style={{
                fontSize: "0.6rem",
                color: "#718096",
                marginTop: "1rem",
              }}
            >
              Please try again or contact support if the problem persists.
            </p>
          </>
        ) : (
          <>
            <h4 style={{ color: "#2d3748", marginBottom: "1rem" }}>
              ✅ Email Verified{displayName ? `, ${displayName}` : ""}!
            </h4>
            <p
              style={{
                fontSize: "0.9rem",
                maxWidth: "500px",
                color: "#4a5568",
              }}
            >
              Thank you for confirming your email address. You can now log in
              through the <strong>SRC Connect</strong> mobile app to start using
              your account.
            </p>
            <p
              style={{
                fontSize: "0.6rem",
                color: "#718096",
                marginTop: "1rem",
              }}
            >
              You may close this page and return to the app now.
            </p>
          </>
        )}
      </div>

      <FooterPage />
    </>
  );
};

export default EmailVerification;
