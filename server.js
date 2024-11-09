const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 10000;

// 모든 출처 허용 (CORS 설정)
app.use(cors());

// 환경 변수에서 API Key 가져오기
const apiKey = process.env.OD_SAY_API_KEY;

// 정류장 검색 API
app.get('/search-station', async (req, res) => {
  const stationName = req.query.stationName;

  if (!stationName || stationName.length < 2) {
    return res.status(400).send({ error: '정류장 이름을 두 글자 이상 입력해주세요.' });
  }

  const url = `https://api.odsay.com/v1/api/searchStation?apiKey=${apiKey}&stationName=${encodeURIComponent(stationName)}&stationClass=1:2`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('정류장 검색 오류:', error);
    res.status(500).send({ error: '정류장 검색 중 오류가 발생했습니다.' });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
