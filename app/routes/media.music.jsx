import {Suspense} from 'react';
import {Container} from 'react-bootstrap';
import {json} from '@shopify/remix-oxygen';

import Toolbar from '~/components/Toolbar';

export async function loader() {
  return json({
    analytics: {
      pageType: 'media/music',
    },
  });
}

const seo = () => ({
  title: 'Music',
  description: 'Listen to his music here',
});
export const handle = {
  seo,
};

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
  'https://open.spotify.com/embed/track/3wGXyJGsCf1myH5MooQIqE?utm_source=generator&theme=0',
  'https://open.spotify.com/embed/track/1WRzux3cJRM9xRNN99QKgR?utm_source=generator&theme=0',
];

export default function music() {
  return (
    <Suspense fallback={null}>
      <Container
        fluid
        className="screen-container"
        style={{backgroundImage: `url('/BackgroundMusic.svg')`}}
      >
        <Toolbar />
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
      </Container>
    </Suspense>
  );
}
