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
  const {policies} = useLoaderData();
  const location = useLocation();
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
          <h1 className="policy-header-text">
            {location.pathname === '/policies/return-policy'
              ? 'Return Policy'
              : 'Shipping Policy'}
          </h1>
          {location.pathname === '/policies/return-policy' && (
            <h3>policies.returnPolicy.body</h3>
          )}
          {location.pathname !== '/policies/return-policy' && (
            <h3>policies.shippingPolicy.body</h3>
          )}
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
    refundPolicy {
            body
            id
            title
            url
        }
  }
}
`;
