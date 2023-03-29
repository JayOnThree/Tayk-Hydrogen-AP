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

  return json({articles});
}

export default function Post() {
  const {articles} = useLoaderData();
  const article = articles && articles.nodes[0];
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
      <h1 className="music-header">Blog</h1>
      <Row
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'scroll',
          marginTop: '-7vh',
          paddingTop: '10vh',
          paddingBottom: '20vh',
          textAlign: 'left',
        }}
      >
        <Col lg={9} md={8} style={{marginBottom: '50px'}}>
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
        <Col lg={3} md={4} className="d-none d-sm-none d-md-block d-lg-block">
          <div
            className="related-post-container"
            style={{marginBottom: '20px', lineHeight: '1'}}
          >
            <h3 className="relatedPosts-text">Related Posts</h3>
            <div className="related-post-div">
              <div
                className="img-div"
                style={{
                  borderRadius: '25px 25px 0px 0px',
                  backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/3/36/Hayden_Bridge.jpg')`,
                }}
              ></div>
              <div style={{padding: '10px'}}>
                <h6 className="header-blogpost-thumb">Lorem ipsum</h6>
                <h6 className="subtitle-blogpost-thumb">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </h6>
              </div>
            </div>
            <div className="related-post-div">
              <div
                className="img-div"
                style={{
                  borderRadius: '25px 25px 0px 0px',
                  backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/3/36/Hayden_Bridge.jpg')`,
                }}
              ></div>
              <div style={{padding: '10px'}}>
                <h6 className="header-blogpost-thumb">Lorem ipsum</h6>
                <h6 className="subtitle-blogpost-thumb">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </h6>
              </div>
            </div>
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
