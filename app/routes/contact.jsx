import {Container, Row, Col} from 'react-bootstrap';
import {motion} from 'framer-motion';

export default function Policies() {
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
          <h1 className="policy-header-text">Contact</h1>
          <h3 style={{textAlign: 'left', paddingTop: '20px'}}>
            For order support please contact:{' '}
            <a href="mailto: support@tayk.world">support@tayk.world</a>
          </h3>
          <h3 style={{textAlign: 'left', paddingTop: '20px'}}>
            For media inquiries please contact Amethyst Collab:{' '}
            <a href="mailto: olivia@amethystcollab.com">
              olivia@amethystcollab.com
            </a>
          </h3>
          <h3 style={{textAlign: 'left', paddingTop: '20px'}}>
            For business inquiries please contact:{' '}
            <a href="mailto: rr4lworldmgmt@gmail.com">
              rr4lworldmgmt@gmail.com
            </a>
          </h3>
        </Col>
      </Row>
    </MotionContainer>
  );
}
