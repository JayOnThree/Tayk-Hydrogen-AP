import {Container, Col, Row} from 'react-bootstrap';
import {useLoaderData, Link} from '@remix-run/react';
import {json} from 'react-router';

import Toolbar from '../components/Toolbar';

const seo = () => ({
  title: 'Blog Posts',
  description: 'Pick a blog post',
});
export const handle = {
  seo,
};

export async function loader({context}) {
  const {articles} = await context.storefront.query(ARTICLES_QUERY);
  return json({
    articles,
    analytics: {
      pageType: 'media/blog',
    },
  });
}

export default function Blog() {
  const {articles} = useLoaderData();
  const noArticles = articles.nodes.length === 0;

  return (
    <Container
      fluid
      className="screen-container"
      style={{backgroundImage: `url('/BackgroundBlog.svg')`}}
    >
      <Toolbar />
      <Row
        style={{
          width: '100vw',
          height: '100%',
          overflow: 'scroll',
          borderRadius: '50px 50px 0 0',
        }}
      >
        {noArticles && (
          <Col lg={{offset: 1, span: 10}} style={{padding: '50px'}}>
            <h1 className="policy-header-text">Coming Soon...</h1>
          </Col>
        )}
        {articles.nodes.map((article, i) => {
          const excerptShort = article.excerpt.slice(0, 70);
          const output = article.title.toLowerCase();
          const output2 = output.replace(/[^\w ]+/g, '');
          const slug = output2.replace(/ +/g, '-');
          return (
            <Col
              lg={4}
              md={6}
              sm={6}
              xs={12}
              key={i}
              style={{marginTop: '40px'}}
            >
              <Link
                to={`/media/blog/${slug}`}
                style={{textAlign: 'left', textDecoration: 'none'}}
              >
                <div className="blog-post-div">
                  <div
                    className="img-div"
                    style={{backgroundImage: `url(${article.image.url})`}}
                  ></div>
                  <div style={{padding: '10px'}}>
                    <h6 className="header-blogpost-thumb">{article.title}</h6>
                    <h6 className="excerpt-blogpost-thumb">
                      {excerptShort}...
                    </h6>
                  </div>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

const ARTICLES_QUERY = `#graphql
  query articlesQuery {
    articles(first: 50) {
    nodes {
      title
      tags
      excerpt
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
