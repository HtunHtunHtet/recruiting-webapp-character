import React from "react";

export default function CharacterSkill({ skillName, attributeModifier, calculateModifier, characterAttributes,points, onIncrease, onDecrease }) {

    const modifier = calculateModifier(characterAttributes[attributeModifier]);

    return (
        <div>
            <span>{skillName} : {points} (Modifier: {attributeModifier}): {modifier}</span>
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
            <span>total: {points + modifier}</span>
        </div>
    );
}