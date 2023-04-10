import {Container, Col, Row} from 'react-bootstrap';
import {useLoaderData} from '@remix-run/react';
import {json} from 'react-router';

import Header from '../components/Header';
import Toolbar from '../components/Toolbar';
import Footer from '~/components/Footer';

export async function loader({context, params}) {
  const searchParams = params.slug;
  const {articles} = await context.storefront.query(ARTICLES_QUERY, {
    variables: {
      query: searchParams,
    },
  });

  return json({
    articles,
    analytics: {
      pageType: `media/blog/${searchParams}`,
    },
  });
}

const seo = ({data}) => ({
  title: data?.articles?.nodes[0].title,
  description: data?.articles?.nodes[0].excerpt,
});
export const handle = {
  seo,
};

export default function Post() {
  const {articles} = useLoaderData();
  const article = articles?.nodes[0];
  return (
    <Container
      fluid
      className="screen-container"
      style={{backgroundImage: `url('/BackgroundBlog.svg')`}}
    >
      <Header
        mediaHome={false}
        blogPost={true}
        productHome={false}
        product={false}
        landingPage={false}
        dragX={0}
      />
      <Toolbar />
      <Row
        style={{
          width: '100vw',
          height: '100%',
          overflow: 'scroll',
          borderRadius: '50px 50px 0 0',
          textAlign: 'left',
        }}
      >
        <Col
          lg={{offset: 1, span: 10}}
          md={{offset: 1, span: 10}}
          style={{marginBottom: '50px', marginTop: '60px'}}
        >
          <div
            className="blogpost-header-img"
            style={{backgroundImage: `url(${article.image.url})`}}
          ></div>
          <div className="blog-content-div">
            <h1 className="blogPost-head">{article.title}</h1>
            <h2 className="blogPost-sub">{article.excerpt}</h2>
            <h3 className="blogPost-body">{article.content}</h3>
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

const ARTICLES_QUERY = `#graphql
  query articlesQuery($query: String!) {
    articles(first: 50, query: $query) {
    nodes {
      title
      tags
      excerpt
      content
      authorV2 {
        firstName
      }
      image {
        id
        url
      }
    }
  }
  }
`;
