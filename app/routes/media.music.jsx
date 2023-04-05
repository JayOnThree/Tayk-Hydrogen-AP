import {Container} from 'react-bootstrap';

import Header from '~/components/Header';
import Toolbar from '../components/Toolbar';
import Footer from '~/components/Footer';

const MusicFrame = ({url}) => {
  return (
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    <iframe
      className="music-iframe-div"
      src={url}
      height="400"
      allowFullScreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

const url = [
  'https://open.spotify.com/embed/track/0Dk9lP1YnOqssHH0oCeq9u?utm_source=generator&theme=0',
  'https://open.spotify.com/embed/track/0Dk9lP1YnOqssHH0oCeq9u?utm_source=generator&theme=0',
  'https://open.spotify.com/embed/track/0Dk9lP1YnOqssHH0oCeq9u?utm_source=generator&theme=0',
];

export default function music() {
  return (
    <Container
      fluid
      className="screen-container"
      style={{backgroundImage: `url('/BackgroundMusic.svg')`}}
    >
      <Toolbar />
      <Header
        mediaHome={false}
        blogPost={false}
        productHome={false}
        product={false}
        landingPage={false}
        dragX={0}
      />
      <div className="music-div">
      <h1 className="music-header d-none d-md-none d-lg-block">Music</h1>
        {url &&
          url.map((link, i) => {
            return (
              <MusicFrame
                key={i}
                style={{marginTop: i === 0 ? '10vh' : '0vh'}}
                url={link}
              />
            );
          })}
      </div>
      <Footer />
    </Container>
  );
}
