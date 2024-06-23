import { useState , useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import CharacterAttribute from "./components/CharacterAttribute";
import CharacterClass from "./components/CharacterClass";
import ErrorBoundary from "./components/ErrorBoundary";
import CharacterSkill from "./components/CharacterSkill";

function App() {

    const [characterAttributes, setCharacterAttributes] = useState(
        ATTRIBUTE_LIST.reduce((attributes, attribute) => ({...attributes, [attribute]: 10 }), {})
    );

    console.log('SKILL_LIST[0].name', SKILL_LIST[0].name);

    /** Multiple Characters **/
    const [characters, setCharacters] = useState([
        {
            attributes: ATTRIBUTE_LIST.reduce((attributes, attribute) => ({...attributes, [attribute]: 10 }), {}),
            skillPoints: SKILL_LIST.reduce((skills, skill) => ({...skills, [skill.name]: 0 }), {}),
            selectedSkill: "",
            dcValue: 0,
            rolledNumber: 0,
            result: ''
        }
    ]);

    const onAttributeChange = (characterIndex, attributeName, attributeValue) => {
        setCharacters(prev => {
            const newCharacters = [...prev];
            newCharacters[characterIndex].attributes[attributeName] = attributeValue;
            saveCharacterData(newCharacters).catch(error => console.error('Error:', error));
            return newCharacters;
        });
    };

    const classArray = Object.entries(CLASS_LIST).map(([name, minAttributes]) => ({
        name, minAttributes
    }));

    const calculateModifier = (attributeValue) => {
        return Math.floor((attributeValue - 10) / 2);
    }

    const calculateTotalAttributes = (characterIndex) => {
        // return Object.values(characters[characterIndex].attributes).reduce((a, b) => a + b, 0);

        if (characters[characterIndex] && characters[characterIndex].attributes) {
            return Object.values(characters[characterIndex].attributes).reduce((a, b) => a + b, 0);
        }
        return 0;
    };

    const [skillPoints, setSkillPoints]   = useState(
        SKILL_LIST.reduce((skills, skill) => ({...skills, [skill.name]: 0 }), {})
    )

    const handleIncrease = (characterIndex, skillName) => {
        setCharacters(prev => {
            const newCharacters = [...prev];
            if (Object.values(newCharacters[characterIndex].skillPoints).reduce((a, b) => a + b, 0) < totalSkillPoints) {
                newCharacters[characterIndex].skillPoints[skillName]++;
            }
            return newCharacters;
        });
    };

    const handleDecrease = (characterIndex, skillName) => {
        setCharacters(prev => {
            const newCharacters = [...prev];
            if (newCharacters[characterIndex].skillPoints[skillName] > 0) {
                newCharacters[characterIndex].skillPoints[skillName]--;
            }
            return newCharacters;
        });
    };

    const [selectedClass, setSelectedClass] = useState(null);
    const [showSelectedClass, setShowSelectedClass] = useState(true);
    const intelligenceModifier = calculateModifier(characterAttributes['Intelligence']);
    const totalSkillPoints = 10 + (4 * intelligenceModifier);
    const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
    const [dcValue, setDcValue] = useState(0);
    const [rolledNumber, setRolledNumber] = useState(0);
    const [result, setResult] = useState('');

    const handleSkillCheck = (characterIndex) => {
        const randomNumber = Math.floor(Math.random() * 20) + 1;
        const totalSkill = characters[characterIndex].skillPoints[characters[characterIndex].selectedSkill] + randomNumber;

        const newCharacters = [...characters];
        newCharacters[characterIndex].rolledNumber = randomNumber;
        newCharacters[characterIndex].result = totalSkill >= newCharacters[characterIndex].dcValue ? 'Success' : 'Failure';
        setCharacters(newCharacters);
    };

    const addCharacter = () => {
        setCharacters(prev => [
            ...prev,
            {
                attributes: ATTRIBUTE_LIST.reduce((attributes, attribute) => ({...attributes, [attribute]: 10 }), {}),
                skillPoints: SKILL_LIST.reduce((skills, skill) => ({...skills, [skill.name]: 0 }), {})
            }
        ]);
    };

    /** API Call **/
    const API_URL = "https://recruiting.verylongdomaintotestwith.ca/api/{HtunHtunHtet}/character";

    const saveCharacterData = async (data) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }

    const loadCharacterData = async () => {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    useEffect(() => {
        loadCharacterData()
            .then(data => {
                if (data.statusCode === 200) {
                    setCharacters(data.body);
                }
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <ErrorBoundary>
            <div className="App">
                <header className="App-header">
                    <h1>React Coding Exercise</h1>
                    <button onClick={addCharacter}>Add Character</button>
                </header>

                {characters.map((character,index) => (
                    <div key={index} style={{backgroundColor: '#282c34', color: 'white'}}>
                        <h1>Character {index + 1}</h1>

                        {/* Skill Check */}
                        <section className="App-section">
                            <h1>Skill Check</h1>

                            <label>
                                Skill:
                                <select value={characters[index].selectedSkill} onChange={(e) => {
                                    const newCharacters = [...characters];
                                    newCharacters[index].selectedSkill = e.target.value;
                                    setCharacters(newCharacters);
                                }}>
                                    <option value="">--- Select ---</option>

                                    {SKILL_LIST.map((skill) => (
                                        <option key={skill.name} value={skill.name}>{skill.name}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                DC:
                                <input type="number" min="0" value={characters[index].dcValue}
                                       onChange={(e) => {
                                           const newCharacters = [...characters];
                                           newCharacters[index].dcValue = Number(e.target.value);
                                           setCharacters(newCharacters);
                                       }}/>
                            </label>

                            <button onClick={() => handleSkillCheck(index)}>Roll</button>

                            <p>Skill: {characters[index].selectedSkill}</p>
                            <p>Rolled: {characters[index].rolledNumber}</p>
                            <p>DC: {characters[index].dcValue}</p>
                            <p>Result: {characters[index].result}</p>
                        </section>

                        <div style={{display: 'flex', justifyContent: 'space-between'}} key={index}>

                            {/*Character Attribute*/}
                            <section className="App-section">
                                <h1>Attribute</h1>

                                {
                                    ATTRIBUTE_LIST.map((attribute) => (
                                        <CharacterAttribute
                                            characterIndex={index}
                                            key={attribute}
                                            attributeName={attribute}
                                            attributeValue={character.attributes[attribute]}
                                            calculateModifier={calculateModifier}
                                            calculateTotalAttributes={calculateTotalAttributes}
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
                                            // characterAttributes={characterAttributes}
                                            characterAttributes={character.attributes}
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

                            {/* Skills*/}
                            <section className="App-section">
                                <h1>Skills</h1>
                                <h2>Total Skill Point Availability : {totalSkillPoints}</h2>
                                {
                                    SKILL_LIST.map((skill) => (
                                        <CharacterSkill
                                            key={skill.name}
                                            characterIndex={index}
                                            skillName={skill.name}
                                            attributeModifier={skill.attributeModifier}
                                            calculateModifier={calculateModifier}
                                            characterAttributes={character.attributes}
                                            points={character.skillPoints[skill.name]}
                                            onIncrease={handleIncrease}
                                            onDecrease={handleDecrease}
                                        />
                                    ))
                                }
                            </section>
                        </div>
                    </div>

                ))}

            </div>
        </ErrorBoundary>
    );
}

export default App;
