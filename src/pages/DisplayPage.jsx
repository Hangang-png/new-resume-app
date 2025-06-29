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
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  const handleDownloadPDF = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.setLineWidth(0.2);
      pdf.rect(5, 5, pdfWidth - 10, pdfHeight - 10);

      const imgProps = pdf.getImageProperties(imgData);
      const contentWidth = pdfWidth - 20;
      const contentHeight = (imgProps.height * contentWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 10, 10, contentWidth, contentHeight);

      pdf.save('resume.pdf');
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div id="pdf-content" className="preview">
        <div className="resume-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          {formData.avatar ? (
            <img
              src={formData.avatar}
              alt="头像"
              className="avatar"
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccc', marginRight: '20px' }}
            />
          ) : (
            <div
              className="avatar placeholder"
              style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#f0f0f0', display: 'inline-block', marginRight: '20px' }}
            />
          )}
          <div className="info">
            <h2>{formData.name || '未填写姓名'}</h2>
            <p className="title">.NET 工程师</p>
            <p className="motto"><em>永远向前</em></p>
            <p className="contact">
              📍 {formData.city || '城市未填'} &nbsp;&nbsp;&nbsp; ☎ {formData.phone || '电话未填'}
            </p>
          </div>
        </div>
        <h2>简历预览</h2>
        <div className="resume-table">
          {Object.entries(formData)
            .filter(([key]) => key !== 'avatar')
            .map(([key, value]) => (
              <div className="row" key={key} style={{ display: 'flex', marginBottom: '10px' }}>
                <div className="label" style={{ width: '80px', fontWeight: 'bold' }}>{translateLabel(key)}：</div>
                <div className="value" style={{ flex: 1 }}>{value}</div>
              </div>
            ))}
        </div>
      </div>
      <footer style={{ marginTop: '20px' }}>
        <button onClick={handleBack} style={{ marginRight: '10px' }}>🔙 返回填写简历</button>
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
