// import {useState} from 'react';
import {Html, useProgress} from '@react-three/drei';

function SceneLoader() {
  return <Html center>{progress} % loaded</Html>;
}

export {SceneLoader};
export function useSceneLoader() {
  const {active, progress, errors, item, loaded, total} = useProgress();
  return {
    active,
    progress,
    loaded,
    total,
  };
  //   const [isOpen, setIsOpen] = useState(openDefault);
  //   function openDrawer() {
  //     setIsOpen(true);
  //   }
  //   function closeDrawer() {
  //     setIsOpen(false);
  //   }
  //   return {
  //     isOpen,
  //     openDrawer,
  //     closeDrawer,
  //   };
}
