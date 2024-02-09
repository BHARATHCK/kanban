import "./ProfileBadge.css";

const ProfileBadge = ({ profileImageUrl, status }) => {
  return (
    <div class="icon-container">
      <img src={profileImageUrl} />
      <div
        class="status-circle"
        style={{ backgroundColor: status ? "green" : "gray" }}
      ></div>
    </div>
  );
};

export default ProfileBadge;
