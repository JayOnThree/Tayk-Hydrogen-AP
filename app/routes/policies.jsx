import {useLoaderData, useLocation} from '@remix-run/react';
import {Container, Row, Col} from 'react-bootstrap';
import {json} from 'react-router';
import {motion} from 'framer-motion';

export async function loader({context}) {
  const {policies} = await context.storefront.query(POLICY_QUERIES);
  return json({
    policies,
    analytics: {
      pageType: 'Policies',
    },
  });
}

export default function Policies() {
  // const {policies} = useLoaderData();
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
        <Col lg={{offset: 1, span: 10}} style={{padding: '20px'}}>
          <h1 className="policy-header-text">Policies</h1>
          <h3 style={{textAlign: 'left', paddingTop: '20px'}}>
            body copy policies
          </h3>
        </Col>
      </Row>
    </MotionContainer>
  );
}

const POLICY_QUERIES = `#graphql
query policies {
  shop{
    name
    shippingPolicy{
      body
      id
      title
      url
    }
  }
}
`;
