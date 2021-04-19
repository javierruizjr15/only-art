import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import useFirestore from '../../utils/useFirestore.js/index.js'
import { motion } from 'framer-motion'

const ArtCard = ({ setSelectedImg }) => {
  const { docs } = useFirestore('images')
  console.log(docs)

  return (
    <div className="img-grid">
      { docs && docs.map(doc => (
        <motion.div className="img-wrap" key={doc.id}
        layout
        whileHover={{ opacity: 1}}
          onClick={() => setSelectedImg(doc.url)}
          >

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