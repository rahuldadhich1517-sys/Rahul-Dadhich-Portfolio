import React from 'react';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  isMobile?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full flex items-center justify-center"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="
          w-full
          max-w-3xl
          md:max-w-4xl
          lg:max-w-5xl
          h-auto
          object-contain
        "
      >
         <source src={`${import.meta.env.BASE_URL}3d-video.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
};

export default ProfileCard;
