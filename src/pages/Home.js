import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import logoImage from '@/assets/images/logo.png';
import { i18n, useTranslation } from '@/utils/LanguageUtils';
import { API } from '@/api';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  padding: 20px;
  font-size: 20px;

  h1 {
    margin: 0;
    padding: 0 0 10px 0;
    font-weight: bold;
    color: #000;
  }

  small {
    font-size: 14px;
  }

  summary {
    margin: 10px 0 0 0;
    font-size: 12px;
  }

  pre {
    margin: 10px 0 0 0;
    font-size: 11px;
  }
`;

export const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());

  const changeLanguage = lang => {
    console.log(`changeLanguage lang: ${lang}`);
    i18n.changeLanguage(lang);
  };

  const api = async () => {
    const { data } = await API({
      method: 'get',
      // url: `/api/v1/member/e/code?listGroupCd=DRIVE_AREA`
      url: `/api/v1/member/e/code`,
      params: {
        listGroupCd: 'DRIVE_AREA'
      }
    });
    console.log('data', data);
    return data;
  };

  return (
    <Container>
      <h1>home</h1>
      <div>
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('ko')}>KO</button>
        <div style={{ height: '100px' }}>{t('validate.required')}</div>
      </div>
      <div>
        <button onClick={api}>api</button>
      </div>
      <div>
        <img src="/assets/images/logo.png" alt="test" />
        <img src={logoImage} alt="test" />
      </div>
      <div>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      </div>
      <button onClick={() => navigate('/test')}>test</button>
    </Container>
  );
};

export default memo(Home);
