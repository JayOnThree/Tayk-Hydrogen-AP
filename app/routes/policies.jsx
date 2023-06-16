import {useLoaderData, useLocation} from '@remix-run/react';
import {Container, Row, Col} from 'react-bootstrap';
import {json} from 'react-router';
import {motion} from 'framer-motion';

export async function loader({context}) {
  const policies = await context.storefront.query(POLICY_QUERIES);

  return json({
    policies,
    analytics: {
      pageType: 'Policies',
    },
  });
}

export default function Policies() {
  const {policies} = useLoaderData();
  // const shipping = policies.shop.shippingPolicy;
  const MotionContainer = motion(Container);
  const shipping = policies.shop.shippingPolicy;
  const refund = policies.shop.refundPolicy;

  return (
    <MotionContainer
      fluid
      className="screen-container"
      initial={{y: 1000, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      exit={{y: 1000, opacity: 0}}
      transition={{duration: 0.3}}
    >
      <Row style={{height: '100%', overflow: 'scroll'}}>
        <Col lg={{offset: 1, span: 10}} style={{padding: '20px'}}>
          <h1 className="policy-header-text">Policies</h1>
          <div
            style={{textAlign: 'left', paddingTop: '20px'}}
            dangerouslySetInnerHTML={{__html: shipping?.body}}
          ></div>
          <div
            style={{textAlign: 'left', paddingTop: '20px', marginBottom: '30px'}}
            dangerouslySetInnerHTML={{__html: refund?.body}}
          ></div>
        </Col>
      </Row>
    </MotionContainer>
  );
}

const POLICY_QUERIES = `#graphql
    query Policy {
        shop{
        shippingPolicy{
          body
          id
          title
          url
          handle
            }
        refundPolicy {
          body
          id
          title
          url
          handle
            }
        }
    }
`;
