import React from 'react';

export default function CharacterClass({ className, requirements, characterAttributes, onSelect }) {
    const meetsRequirements = Object.keys(requirements).every((attribute) => {
        return characterAttributes[attribute] >= requirements[attribute];
    });

    console.log('meetsRequirements', meetsRequirements);

    const color = meetsRequirements ? 'red' : 'white';

    return (
        <div style={{color: color}} onClick={onSelect}>
            {className}
        </div>
    );
}