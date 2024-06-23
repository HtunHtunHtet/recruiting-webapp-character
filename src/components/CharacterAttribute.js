import React from "react";

export default function CharacterAttribute({ attributeName, attributeValue,  onAttributeChange }) {

    const handleIncrease = () => {
        onAttributeChange(attributeName, attributeValue + 1);
    };

    const handleDecrease = () => {
        onAttributeChange(attributeName, attributeValue - 1);
    };

    return (
        <div>
            <span>{attributeName}: {attributeValue}  </span>
            <button onClick={handleIncrease}>+</button>
            <button onClick={handleDecrease}>-</button>
        </div>
    );
}