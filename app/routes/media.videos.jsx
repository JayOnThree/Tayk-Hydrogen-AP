import {Suspense} from 'react';
import {Container} from 'react-bootstrap';
import {json} from '@shopify/remix-oxygen';

import Toolbar from '~/components/Toolbar';

export async function loader() {
  return json({
    analytics: {
      pageType: 'media/videos',
    },
  });
}

const seo = () => ({
  title: 'Videos',
  description: 'View his videos here',
});
export const handle = {
  seo,
};

const VideoFrame = ({url}) => {
  return (
    <>
      <Suspense fallback={null}>
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
      </Suspense>
    </>
  );
};

const url = [
  'https://www.youtube.com/embed/q6I0Aa_62IM',
  'https://www.youtube.com/embed/OYhXJaEbw7c',
  'https://www.youtube.com/embed/Z0leBlnf1Ng',
];

export default function Videos() {
  return (
    <Container
      fluid
      className="screen-container"
      style={{backgroundImage: `url('/BackgroundVideos.svg')`}}
    >
      <Toolbar home={false} blogPost={false} />
      <div className="backgroundLayer">
        <h1 className="music-header d-none d-md-none d-lg-block">Videos</h1>
        {url &&
          url.map((link, i) => {
            return (
              <div style={{marginTop: i === 0 ? '10vh' : '0vh'}} key={i}>
                <VideoFrame url={link} />
              </div>
            );
          })}
      </div>
    </Container>
  );
}
