import { SyncOutlined } from "@ant-design/icons";
const ForgetPasswordForm = ({
  handleSubmit,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  secret,
  setSecret,
  loading,
  page,
}) => {
  return (
    <form onSubmit={handleSubmit}>
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
        />
      </div>
      <div className="form-group py-2">
        <small>
          <label className="text-muted p-1">New password</label>
        </small>
        <input
          onChange={(e) => {
            console.log(newPassword);
            setNewPassword(e.target.value);
          }}
          type="password"
          className="form-control"
          placeholder="Enter new password"
          value={newPassword}
        />
      </div>

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

      <div className="form-group p-2">
        <button
          disabled={!secret || !email || !newPassword || loading}
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

export default ForgetPasswordForm;
