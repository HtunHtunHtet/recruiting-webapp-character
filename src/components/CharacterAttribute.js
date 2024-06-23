import React from "react";

export default function CharacterAttribute({ characterIndex, attributeName, attributeValue, calculateModifier, calculateTotalAttributes, onAttributeChange }) {

    const modifier = calculateModifier(attributeValue);

    const handleIncrease = () => {
        console.log('calculateTotalAttributes', calculateTotalAttributes());

        if (calculateTotalAttributes(characterIndex) < 70) {
            onAttributeChange(characterIndex, attributeName, attributeValue + 1);
        } else {
            alert("A character can have up to 70 delegated attribute points");
        }
    };

    const handleDecrease = () => {
        if (attributeValue > 0) {
            onAttributeChange(characterIndex, attributeName, attributeValue - 1);
        }
    };

    return (
        <div>
            <span>{attributeName}: {attributeValue} (Modifier: {modifier}) </span>
            <button onClick={handleIncrease}>+</button>
            <button onClick={handleDecrease}>-</button>
        </div>
    );
}