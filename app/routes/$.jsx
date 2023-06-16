import {Container, Col, Row} from 'react-bootstrap';

export default function PageNotFound() {
  return (
    <Container
      fluid
      className="screen-container"
      style={{backgroundImage: `url('/BackgroundBlog.svg')`}}
    >
      <h1 className="policy-header-text" style={{padding: '20px'}}>404 PAGE NOT FOUND</h1>
      {/* <Row className="row-message-container">
      </Row> */}
    </Container>
  );
}
