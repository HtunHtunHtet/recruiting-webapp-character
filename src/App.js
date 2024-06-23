import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import CharacterAttribute from "./components/CharacterAttribute";


function App() {

    const [characterAttributes, setCharacterAttributes] = useState(
        ATTRIBUTE_LIST.reduce((attributes, attribute) => ({...attributes, [attribute]: 10 }), {})
    );

    const onAttributeChange = (attributeName, attributeValue) => {
        setCharacterAttributes(prev => ({...prev, [attributeName]: attributeValue}));
    };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <section className="App-section">
                <h1>Attribute</h1>
                {/*Character Attribute*/}
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
        </div>
    </div>
  );
}

export default App;
