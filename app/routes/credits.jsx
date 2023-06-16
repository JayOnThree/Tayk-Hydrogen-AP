import {Container, Row, Col} from 'react-bootstrap';
import {motion} from 'framer-motion';

export default function Credits() {
  const MotionContainer = motion(Container);

  return (
    <MotionContainer
      fluid
      className="screen-container"
      style={{overflow: 'hidden'}}
      initial={{y: 1000, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      exit={{y: 1000, opacity: 0}}
      transition={{duration: 0.3}}
    >
      <Row>
        <Col lg={{offset: 1, span: 10}} style={{padding: '50px'}}>
          <h1 className="policy-header-text">Credits</h1>
          <h3 style={{textAlign: 'left', paddingTop: '20px'}}>
            Design and Developement:{' '}
            <a href="https://www.instagram.com/gideonchrapko/">Gideon Chrapko</a>
          </h3>
          <h3 style={{textAlign: 'left', paddingTop: '20px'}}>
            Character Design:
            <a href="https://www.instagram.com/satchfilms/">
              Satxh
            </a>
          </h3>
          <h3 style={{textAlign: 'left', paddingTop: '20px'}}>
            Management:{' '}
            <a href="https://instagram.com/danielgreenstour">
              Danielgreenstour
            </a>
          </h3>
        </Col>
      </Row>
    </MotionContainer>
  );
}
