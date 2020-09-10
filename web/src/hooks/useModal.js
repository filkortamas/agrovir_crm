import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => setIsShowing(isShowing => !isShowing);

  return {
    isModalShowing: isShowing,
    toggleModal: toggle
  };
};

export default useModal;