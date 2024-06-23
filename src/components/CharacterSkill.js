import React from "react";

export default function CharacterSkill({ characterIndex, skillName, attributeModifier, calculateModifier, characterAttributes,points, onIncrease, onDecrease }) {

    const modifier = calculateModifier(characterAttributes[attributeModifier]);

    console.log('modifier', modifier);
    console.log('points', points);

    return (
        <div>
            <span>{skillName} : {points} (Modifier: {attributeModifier}): {modifier}</span>
            <button onClick={() => onIncrease(characterIndex, skillName)}>+</button>
            <button onClick={() => onDecrease(characterIndex, skillName)}>-</button>
            <span>total: {points + modifier}</span>
        </div>
    );
}