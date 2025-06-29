import React, { useState, useEffect } from "react";

const AvatarUploader = ({ avatar, onAvatarChange }) => {
  const [preview, setPreview] = useState(avatar || null);

  useEffect(() => {
    setPreview(avatar); // 当父组件传新头像时更新预览
  }, [avatar]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setPreview(base64);
        onAvatarChange(base64); // 通知父组件更新
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <img
          src={preview}
          alt="头像"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px solid #ccc",
            marginTop: "10px"
          }}
        />
      )}
    </div>
  );
};

export default AvatarUploader;
