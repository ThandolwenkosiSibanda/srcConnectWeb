import { useState, useEffect } from "react";
import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";
import { supabase } from "../utils/supabase";

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [displayName, setDisplayName] = useState("");

  // Check if we have a valid Supabase session + get user name
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setError("Invalid or expired reset link.");
        setIsSessionValid(false);
      } else {
        setIsSessionValid(true);

        // Fetch user profile
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          const meta = userData.user.user_metadata || {};
          setDisplayName(
            meta.display_name ||
              `${meta.first_name || ""} ${meta.last_name || ""}`.trim() ||
              userData.user.email
          );
        }
      }
    };
    checkSession();
  }, []);

  const handlePasswordReset = async () => {
    setError(null);
    setSuccess(null);

    if (!password || !passwordConfirm) {
      setError("Please fill in both fields.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!isSessionValid) {
      setError("No valid reset session found.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(
        "✅ Password successfully reset. You can now log in on the SRC Connect mobile app."
      );
      setPassword("");
      setPasswordConfirm("");
    }

    setLoading(false);
  };

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
        <h5 style={{ color: "#2d3748", marginBottom: "1rem" }}>
          🔑 Reset Your Password
        </h5>

        {isSessionValid ? (
          <>
            {displayName && (
              <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>
                Hello, {displayName}
              </p>
            )}

            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "0.5rem",
                marginBottom: "0.5rem",
                width: "250px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              style={{
                padding: "0.5rem",
                marginBottom: "0.5rem",
                width: "250px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              disabled={loading}
            />

            <button
              onClick={handlePasswordReset}
              disabled={loading}
              style={{
                backgroundColor: "#2d3748",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </>
        ) : (
          <p style={{ color: "#e53e3e", fontWeight: "bold" }}>
            ❌ Invalid or expired reset link.
          </p>
        )}

        {error && (
          <p
            style={{ marginTop: "1rem", color: "#e53e3e", fontWeight: "bold" }}
          >
            ❌ {error}
          </p>
        )}

        {success && (
          <p
            style={{ marginTop: "1rem", color: "#38a169", fontWeight: "bold" }}
          >
            {success}
          </p>
        )}
      </div>
      <FooterPage />
    </>
  );
};

export default PasswordReset;
