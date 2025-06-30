import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarUploader from '../components/AvatarUploader';

const InputPage = () => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    return saved
      ? JSON.parse(saved)
      : {
          name: '',
          age: '',
          gender: '',
          phone: '',
          city: '',
          title: '',     // ✅ 职位
          motto: '',     // ✅ 格言
          education: '',
          skills: '',
          experience: '',
          about: '',
          expection: '',
          english: '',
          avatar: '',
        };
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    navigate('/display');
  };

  return (
    <div className="container">
      <div className="resume-header">
        <AvatarUploader
          avatar={formData.avatar}
          onAvatarChange={(base64) =>
            setFormData((prev) => ({ ...prev, avatar: base64 }))
          }
        />
        <div className="info">
          <h2>{formData.name || 'XXX'}</h2>
          <p className="title">{formData.title || '.NET 工程师'}</p>
          <p className="motto">Motto：{formData.motto || '永远向前'}</p>
          <p className="contact">
            📍 {formData.city || '城市未填'}
          </p>
        </div>
      </div>

      <h2>填写简历信息</h2>
      <form className="form">
        {[
          ['姓名', 'name'],
          ['年龄', 'age'],
          ['性别', 'gender'],
          ['电话', 'phone'],
          ['所在城市', 'city'],
          ['职位', 'title'],
          ['格言', 'motto'],
          ['教育背景', 'education'],
          ['技能专长', 'skills'],
          ['项目经验', 'experience'],
          ['自我评价', 'about'],
          ['求职意向', 'expection'],
          ['英语能力', 'english'],
        ].map(([label, name]) => (
          <div className="form-group" key={name}>
            <label htmlFor={name}>{label}：</label>
            <input
              type="text"
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </form>

      <footer>
        <button onClick={handleNext}>预览简历</button>
        <p>&copy; 2025 Resume. All rights reserved.</p>
        <div style={{ marginTop: '20px' }}>
          <audio controls loop>
            <source src="/new-resume-app/mp3/together.mp3" type="audio/mpeg" />
            您的浏览器不支持音频播放。
          </audio>
        </div>
      </footer>
    </div>
  );
};

export default InputPage;
