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

const seo = () => ({
  title: 'Messages',
  description: 'Shoot Tay K a message',
});
export const handle = {
  seo,
};

export default function Messages() {
  return (
    <Container
      fluid
      className="screen-container"
      style={{backgroundImage: `url('/BackgroundBlog.svg')`}}
    >
      <Header/>
      <Toolbar />
      <h1 className="music-header d-none d-md-none d-lg-block">Messages</h1>
      <Row className="row-message-container">
        <MailchimpForm />
      </Row>
      <Footer />
    </Container>
  );
}
