import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const translateLabel = (key) => {
  const map = {
    name: '姓名',
    age: '年龄',
    gender: '性别',
    phone: '电话',
    city: '所在城市',
    title: '职位',
    motto: '格言',
    education: '教育背景',
    skills: '技能专长',
    experience: '项目经验',
    about: '自我评价',
    expection: '求职意向',
    english: '英语能力',
  };
  return map[key] || key;
};

const DisplayPage = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log('🧾 当前简历数据：', parsed); // ✅ 确保数据完整
      setFormData(parsed);
    }
  }, []);

  const handleDownloadPDF = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const contentWidth = pdfWidth - 20;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, contentWidth, contentHeight);
      pdf.save('resume.pdf');
    });
  };

  const handleBack = () => navigate('/');

  return (
    <div className="container">
      <div id="pdf-content" className="preview">
        <div className="resume-header" style={{ display: 'flex', alignItems: 'center' }}>
          {formData.avatar ? (
            <img
              src={formData.avatar}
              alt="头像"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid #ccc',
                marginRight: '20px',
              }}
            />
          ) : (
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: '#f0f0f0',
                marginRight: '20px',
              }}
            />
          )}
          <div className="info">
            <h2>{formData.name || '未填写姓名'}</h2>
            <p className="title">{formData.title || '职位未填'}</p>
            <p className="motto">{formData.motto || '永远向前'}</p>
            <p className="contact">
              📍 {formData.city || '城市未填'}
            </p>
          </div>
        </div>

        <h2>简历预览</h2>
        <div className="resume-table">
          {Object.entries(formData)
          .filter(([key]) => key !== 'avatar')
          .map(([key, value]) => (
        <div key={key} className="row" style={{ display: 'flex', marginBottom: '10px' }}>
      <div className="label" style={{ width: '80px', fontWeight: 'bold' }}>
        {translateLabel(key)}：
      </div>
      <div className="value" style={{ flex: 1 }}>
        {value || <span style={{ color: '#999' }}>（未填写）</span>}
      </div>
    </div>
))}
        </div>
      </div>

      <footer style={{ marginTop: '20px' }}>
        <button onClick={handleBack}>🔙 返回填写简历</button>
        <button onClick={handleDownloadPDF}>📄 下载为 PDF</button>
        <p style={{ marginTop: '10px' }}>&copy; 2025 Resume. All rights reserved.</p>
        <div style={{ marginTop: '20px' }}>
          <audio controls loop>
            <source src="/new-resume-app/mp3/kingsaybye.mp3" type="audio/mpeg" />
            您的浏览器不支持音频播放。
          </audio>
        </div>
      </footer>
    </div>
  );
};

export default DisplayPage;
