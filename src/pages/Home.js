import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";

const Home = () => {
  return (
    <>
      <div
        className="page"
        style={{ backgroundColor: "#fff", minHeight: "100vh" }}
      >
        <NavBar />

        <main
          className="site-main"
          style={{
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "3rem 1.5rem",
            textAlign: "center",
            color: "#334155",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "1rem",
              color: "#1e293b",
            }}
          >
            Welcome to SRC Connect!
          </h1>
          <p
            style={{
              maxWidth: 600,
              fontSize: "1.125rem",
              lineHeight: 1.6,
              marginBottom: "2rem",
              color: "#475569",
            }}
          >
            Empower your SRC experience — submit complaints, vote on issues,
            stay updated with news and events, and stay connected.
          </p>

          <p
            style={{
              marginTop: "1rem",
              fontWeight: "600",
              fontSize: "1.125rem",
            }}
          >
            Already have an account ?{" "}
            <strong style={{ color: "#cf2e2e" }}>Log in</strong> on your mobile
            app.
          </p>

          <p
            style={{
              marginTop: "1rem",
              fontWeight: "600",
              fontSize: "1.125rem",
            }}
          >
            New here ?{" "}
            <strong style={{ color: "#cf2e2e" }}>
              Download the android app
            </strong>{" "}
            and sign up using your institution email.
          </p>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a
              href="https://github.com/ThandolwenkosiSibanda/srcConnectWeb/releases/download/v1.0.1/src-connect.apk"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#cf2e2e",
                color: "#fff",
                padding: "0.75rem 2rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: "1rem",
                boxShadow: "0 4px 6px rgba(37, 99, 235, 0.4)",
                transition: "background-color 0.3s ease",
                display: "inline-block",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#cf2e2e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#cf2e2e")
              }
            >
              Download App
            </a>

            {/* <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Android_logo_2019.svg"
              alt="Android phone icon"
              style={{ width: "50px", height: "50px", objectFit: "contain" }}
            /> */}
          </div>
        </main>

        <FooterPage />
      </div>
    </>
  );
};

export default Home;
