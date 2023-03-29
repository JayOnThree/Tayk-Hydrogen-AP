import {Container, Col, Row} from 'react-bootstrap';

import Toolbar from '../components/Toolbar';
import Header from '../components/Header';
import Footer from '~/components/Footer';

export default function Messages() {
  return (
    <Container
      fluid
      className="screen-container"
      style={{backgroundImage: `url('/BackgroundBlog.svg')`}}
    >
      <Header
        mediaHome={false}
        blogPost={false}
        productHome={false}
        product={false}
        landingPage={false}
        dragX={0}
      />
      <Toolbar />
      <h1 className="music-header">Messages</h1>
      <Row className="row-message-container">
        <div style={{height: '70%'}}>
          <div
            style={{
              background: '#E9E9EB',
              borderRadius: '50px',
              position: 'absolute',
              marginTop: '10%',
            }}
          >
            <h3 className="messanger-text-contact">
              Show some support for Tay, Shoot him a message here.
            </h3>
          </div>
          <div
            style={{
              background: '#0085FF',
              borderRadius: '50px',
              bottom: '35%',
              position: 'absolute',
              right: '15px',
            }}
          >
            <h3 className="messanger-text-sent">
              Your message has been succesfully sent! Thank you!
            </h3>
          </div>
        </div>
        <div
          style={{
            height: '30%',
            borderTop: 'grey solid 1px',
            color: 'black',
            display: 'flex',
          }}
        >
          <Col lg={{span: 8, offset: 2}}>
            <input
              type="message"
              id="site-search"
              name="q"
              className="message-input"
            />
            <textarea
              type="message"
              id="site-search"
              name="q"
              className="message-textarea"
            />
          </Col>
          <Col lg={2} style={{height: '100%', width: '100%'}}>
            <img alt="Send" src="/send.svg" className="enter-button" />
          </Col>
        </div>
      </Row>
      <Footer />
    </Container>
  );
}
