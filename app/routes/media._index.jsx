import {Container, Col, Row} from 'react-bootstrap';
import {Link} from '@remix-run/react';
import {motion} from 'framer-motion';
import {json} from 'react-router';

import Toolbar from '../components/Toolbar';
import Header from '../components/Header';
import Footer from '~/components/Footer';

export async function loader() {
  return json({
    analytics: {
      pageType: 'media',
    },
  });
}

export default function Media() {
  const MotionContainer = motion(Container);

  return (
    <MotionContainer
      fluid
      className="screen-container"
      style={{backgroundImage: `url('/Background.jpg')`}}
      initial={{y: 1000, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      exit={{y: 1000, opacity: 0}}
      transition={{duration: 0.3}}
    >
      <Header
        mediaHome={true}
        blogPost={false}
        productHome={false}
        product={false}
        landingPage={false}
        dragX={{x:0}}
      />
      <Toolbar />
      <Row style={{width: '100%', marginTop: '15vh', marginLeft: 0}}>
        <Col
          lg={{offset: 2, span: 2}}
          md={{offset: 2, span: 4}}
          xs={{offset: 1, span: 5}}
          className="icon-col"
        >
          <Link to="/media/messages" style={{ textDecoration: 'none' }}>
            <img alt="messages" src="Messages.svg" className="icon-image" />
            <h2 className="icon-text">Messages</h2>
          </Link>
        </Col>
        <Col
          lg={{offset: 1, span: 2}}
          md={{offset: 0, span: 4}}
          xs={{offset: 0, span: 5}}
          className="icon-col"
        >
          <Link to="/media/videos" style={{ textDecoration: 'none' }}>
            <img alt="videos" src="Videos.svg" className="icon-image" />
            <h2 className="icon-text">Videos</h2>
          </Link>
        </Col>
        <Col
          lg={{offset: 1, span: 2}}
          md={{offset: 2, span: 4}}
          xs={{offset: 1, span: 5}}
          className="icon-col"
        >
          <Link to="/media/music" style={{ textDecoration: 'none' }}>
            <img src="Music.svg" className="icon-image" alt="Music" />
            <h2 className="icon-text">Music</h2>
          </Link>
        </Col>
        <Col
          lg={{offset: 2, span: 2}}
          md={{offset: 0, span: 4}}
          xs={{offset: 0, span: 5}}
          className="icon-col"
        >
          <Link to="/media/blog" style={{ textDecoration: 'none' }}>
            <img src="Blog.svg" className="icon-image" alt="Blog" />
            <h2 className="icon-text">Blog</h2>
          </Link>
        </Col>
      </Row>
      <Footer />
    </MotionContainer>
  );
}
