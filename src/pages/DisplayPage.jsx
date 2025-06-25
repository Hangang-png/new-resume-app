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
    photo: '头像'
  };
  return map[key] || key;
};

const DisplayPage = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate(); // ✅ 放在函数组件内部顶层

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
    navigate('/'); // ✅ 返回输入页面
  };

  return (
    <div className="container">
      <div id="pdf-content" className="preview">
         {/* ✅ 预览页面头部：添加在这里 */}
      <div className="resume-header">
        <img src="/photo.jpg" alt="头像" className="avatar" />
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
          {Object.entries(formData).map(([key, value]) => (
            <div className="row" key={key}>
              <div className="label">{translateLabel(key)}：</div>
              <div className="value">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <footer>        
        <button onClick={handleBack}>🔙 返回填写简历</button>      
        <p>&copy; 2025 Resume. All rights reserved.</p>
        <div style={{ marginTop: '20px' }}>
         <audio controls loop>
            <source src="/mp3/kingsaybye.mp3" type="audio/mpeg" />
              您的浏览器不支持音频播放。
          </audio>
        </div>
        <button onClick={handleDownloadPDF}> 📄 下载为  PDF </button>
	    </footer>
    </div>
  );
};

export default DisplayPage;
