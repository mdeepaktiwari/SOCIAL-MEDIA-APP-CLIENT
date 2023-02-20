import { SyncOutlined } from "@ant-design/icons";
// for register, login and update form
const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
  username,
  setUsername,
  about,
  setAbout,
  profileUpdate,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {profileUpdate && (
        <>
          <div className="form-group py-2">
            <small>
              <label className="text-muted p-1">Username</label>
            </small>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
            />
          </div>
          <div className="form-group py-2">
            <small>
              <label className="text-muted p-1">About</label>
            </small>
            <input
              onChange={(e) => {
                setAbout(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Enter About"
              value={about}
            />
          </div>
        </>
      )}
      {!page && (
        <div className="form-group py-2">
          <small>
            <label className="text-muted p-1">Your name</label>
          </small>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Enter name"
            value={name}
          />
        </div>
      )}
      <div className="form-group py-2">
        <small>
          <label className="text-muted p-1">Email Address</label>
        </small>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          disabled={profileUpdate}
        />
      </div>
      <div className="form-group py-2">
        <small>
          <label className="text-muted p-1">Password</label>
        </small>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
        />
      </div>
      {!page && (
        <div className="form-group py-2">
          <small>
            <label className="text-muted p-1">Pick your question</label>
          </small>
          <select className="form-control">
            <option>What is your favourite color?</option>
            <option>What is your favourite best friend name?</option>
            <option>What is your pet name?</option>
          </select>
          <small className="form-text text-muted px-2">
            For security question
          </small>
        </div>
      )}

      {!page && (
        <div className="form-group py-2">
          <input
            onChange={(e) => {
              setSecret(e.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Write your answer here"
            value={secret}
          />
        </div>
      )}
      <div className="form-group p-2">
        {/* if it is login page we want to have different check. If it is register page we want
      to have different check else we want no check in profile page */}
        <button
          disabled={
            profileUpdate
              ? loading
              : page === "login"
              ? !email || !password || loading
              : !name || !secret || !email || !password || loading
          }
          className="btn btn-dark btn-block col-12"
        >
          {loading ? (
            <SyncOutlined spin className="py-1" />
          ) : (
            <span>Submit</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
