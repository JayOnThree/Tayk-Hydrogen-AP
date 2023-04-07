import {Container, Col, Row} from 'react-bootstrap';
import {json} from '@shopify/remix-oxygen';

import Toolbar from '../components/Toolbar';
import Header from '../components/Header';
import Footer from '~/components/Footer';
import MailchimpForm from '~/components/Mailchimp/MailchimpSubscribe';

export async function loader() {
  return json({
    analytics: {
      pageType: 'media/messages',
    },
  });
}

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
      <h1 className="music-header d-none d-md-none d-lg-block">Messages</h1>
      <Row className="row-message-container">
        <MailchimpForm />
      </Row>
      <Footer />
    </Container>
  );
}
