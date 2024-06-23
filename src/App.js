import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import CharacterAttribute from "./components/CharacterAttribute";
import CharacterClass from "./components/CharacterClass";


function App() {

    const [characterAttributes, setCharacterAttributes] = useState(
        ATTRIBUTE_LIST.reduce((attributes, attribute) => ({...attributes, [attribute]: 10 }), {})
    );

    const onAttributeChange = (attributeName, attributeValue) => {
        setCharacterAttributes(prev => ({...prev, [attributeName]: attributeValue}));
    };

    const classArray = Object.entries(CLASS_LIST).map(([name, minAttributes]) => ({
        name, minAttributes
    }));

    const [selectedClass, setSelectedClass] = useState(null);

    const [showSelectedClass, setShowSelectedClass] = useState(true);

    return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>

            {/*Character Attribute*/}
            <section className="App-section">
                <h1>Attribute</h1>

                {
                    ATTRIBUTE_LIST.map((attribute) => (
                        <CharacterAttribute
                            key={attribute}
                            attributeName={attribute}
                            attributeValue={characterAttributes[attribute]}
                            onAttributeChange={onAttributeChange}
                        />
                    ))
                }
            </section>

            {/*Character Class*/}
            <section className="App-section">
                <h1>Classes</h1>
                {
                    classArray.map(({name, minAttributes}) => (
                        <CharacterClass
                            key={name}
                            className={name}
                            requirements={minAttributes}
                            characterAttributes={characterAttributes}
                            onSelect={() => {
                                setShowSelectedClass(true);
                                setSelectedClass({name, minAttributes})
                            }}
                        />
                    ))
                }
            </section>

            {/* Minimum Requirement */}
            {showSelectedClass && selectedClass && (
                <section className="App-section">
                    <h2>{selectedClass.name} minimum requirement</h2>
                    {Object.entries(selectedClass.minAttributes).map(([attribute, value]) => (
                        <p key={attribute}>{attribute}: {value}</p>
                    ))}

                    <button onClick={() => setShowSelectedClass(!showSelectedClass)}>
                        {showSelectedClass ? 'Close' : 'Show'} Requirement View
                    </button>
                </section>
            )}

        </div>
    </div>
  );
}

export default App;
