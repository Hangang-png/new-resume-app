import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
          education: '',
          skills: '',
          experience: '',
          about: '',
          expection: '',
          english: '',
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
        <img src="/photo.jpg" alt="头像" className="avatar" />
        <div className="info">
          <h2>Maria Rossi</h2>
          <p className="title">.NET 工程师</p>
          <p className="motto">格言：永远向前</p>
          <p className="contact">📍 多伦多 &nbsp;&nbsp;&nbsp; ☎ 437-477-6689</p>
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
          ['教育背景', 'education'],
          ['技能专长', 'skills'],
          ['项目经验', 'experience'],
          ['自我评价', 'about'],
          ['求职意向', 'expection'],
          ['英语能力', 'english'],
        ].map(([label, name]) => (
          <div className="form-group" key={name}>
            <label>{label}：</label>
            <input
              type="text"
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
            <source src="/mp3/together.mp3" type="audio/mpeg" />
              您的浏览器不支持音频播放。
          </audio>
        </div>
	    </footer>
    </div>
  );
};

export default InputPage;
