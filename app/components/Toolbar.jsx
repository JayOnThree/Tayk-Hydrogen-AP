import {useState} from 'react';
import {Col, Row} from 'react-bootstrap';
// import {useNavigate} from 'react-router-dom';

export default function Toolbar() {
  const [today, setDate] = useState(new Date());
  const locale = 'en';
  const time = today.toLocaleTimeString(locale, {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
  });

  return (
    <div style={{position: 'relative', zIndex: '5'}}>
      <Row style={{width: '100%'}}>
        <Col style={{position: 'absolute'}}>
          <h4 className="time-header">{time}</h4>
          <img alt="battery" src="/toolbar.svg" className="toolbar-icon" />
        </Col>
      </Row>
    </div>
  );
}
