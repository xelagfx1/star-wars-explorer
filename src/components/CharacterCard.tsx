import React from 'react';
import styles from './CharacterCard.module.css'; // Import stylesheet

interface Character {
    name: string;
    // Add other properties expected in the character data
}
interface CharacterWithExtras extends Character {
    [key: string]: unknown; // Allows for unknown properties
}
const CharacterCard: React.FC<any> = ({ character }) => {
  return (
        <div className={styles.card}>
        <h2 className={styles.name}>{character.name}</h2>
        <div className={styles.details}>
        <p className={styles.name}>Birth Year: {character.birth_year}</p>
        <p className={styles.name}>Gender: {character.gender}</p>
        {/* Add elements for other character details */}
        </div>
        
        </div>
    
  );
};

export default CharacterCard;