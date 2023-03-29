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
      <h1 className="music-header">Music</h1>
      <div className="music-div">
        <MusicFrame
          url={
            'https://open.spotify.com/embed/track/0Dk9lP1YnOqssHH0oCeq9u?utm_source=generator&theme=0'
          }
        />
        <MusicFrame
          url={
            'https://open.spotify.com/embed/track/1WRzux3cJRM9xRNN99QKgR?utm_source=generator&theme=0'
          }
        />
        <MusicFrame
          url={
            'https://open.spotify.com/embed/track/3wGXyJGsCf1myH5MooQIqE?utm_source=generator&theme=0'
          }
        />
      </div>
      <Footer />
    </Container>
  );
}
