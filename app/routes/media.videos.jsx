import {Container} from 'react-bootstrap';

import Toolbar from '../components/Toolbar';
import Header from '../components/Header';
import Footer from '~/components/Footer';

const VideoFrame = ({url}) => {
  return (
    <>
      <div className="d-none d-md-none d-lg-block">
        <iframe
          className="videos-iframe-desktop"
          width="560"
          height="315"
          src={url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="d-block d-lg-none">
        <iframe
          className="videos-iframe-mobile"
          width="560"
          height="315"
          src={url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default function Videos() {
  return (
    <Container
      fluid
      className="screen-container"
      style={{backgroundImage: `url('/BackgroundVideos.svg')`}}
    >
      <Header
        mediaHome={false}
        media={true}
        blogPost={false}
        productHome={false}
        product={false}
        dragX={0}
      />
      <Toolbar home={false} blogPost={false} />
      <h1 className="music-header d-none d-md-none d-lg-block">Videos</h1>
      <div className="backgroundLayer">
        <VideoFrame url={'https://www.youtube.com/embed/q6I0Aa_62IM'} />
        <VideoFrame url={'https://www.youtube.com/embed/OYhXJaEbw7c'} />
        <VideoFrame url={'https://www.youtube.com/embed/Z0leBlnf1Ng'} />
      </div>
      <Footer />
    </Container>
  );
}
