// component to give parallax effect in bg
const Parallexbg = ({ url, children = "COFFEE" }) => {
  return (
    <div
      className="container-fluid text-center py-5"
      style={{
        backgroundImage: "url(" + url + ")",
        backgroundPosition: "bottom",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "block",
        color: "white",
        textShadow: "2px 2px 8px #000",
      }}
    >
      <h1 className="text-center">{children}</h1>
    </div>
  );
};

export default Parallexbg;
