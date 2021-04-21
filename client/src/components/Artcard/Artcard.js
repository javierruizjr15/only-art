import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import useFirestore from '../../utils/useFirestore.js/index.js'
import { motion } from 'framer-motion'
import { useState, useEffect } from "react"

const ArtCard = ({ setSelectedImg }) => {
  const { docs } = useFirestore('images')
  
  return (
    <div className="img-grid">
      { docs && docs.map(doc => (
        <motion.div className="img-wrap" key={doc.id}
        layout
        whileHover={{ opacity: 1}}
          onClick={() => setSelectedImg(doc.url)}
          >
          
          console.log('test', docs.user.artist.name)
          <motion.img src={doc.url} alt="uploaded art"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ArtCard;