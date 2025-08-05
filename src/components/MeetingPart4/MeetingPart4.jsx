import style from './MeetingPart4.module.css';
import Arrow from '../../assets/icons/arrow.svg';
import { useFormData } from '../MeetingFrame/MeetingFrame';
import React, { useState } from 'react';
import Cheq from '../Cheq/Cheq'; // useState is now used!

export default function MeetingPart4() {
    const { formData, updateFormData, goToNextStep } = useFormData();
    const [Showcheq, setShowcheq] = useState(false);

    const [decisions, setDecisions] = useState(formData.decisions || [
      
    ]);
    const [newItemText, setNewItemText] = useState('');
    const [isAddingNew, setIsAddingNew] = useState(false); // State to control showing input

    const handleAddItem = () => {
        if (newItemText.trim() !== '') {
            const updatedDecisions = [...decisions, newItemText.trim()];
            setDecisions(updatedDecisions);
            updateFormData({ ...formData, decisions: updatedDecisions }); // Update global form data
            setNewItemText(''); // Clear input
            setIsAddingNew(false); // Hide input after adding
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddItem();
        }
    };

    // Optional: Function to remove an item
    const handleRemoveItem = (indexToRemove) => {
        const updatedDecisions = decisions.filter((_, index) => index !== indexToRemove);
        setDecisions(updatedDecisions);
        updateFormData({ ...formData, decisions: updatedDecisions });
    };
    const handlecheq= () => {
    setShowcheq(!Showcheq);
    };
    if(Showcheq){
        return <Cheq setShowcheq={setShowcheq} />

    }
    else{



    return (
        <div className={style.DocumentPart2}>
            <h1>تصمیمات اخذ شده را وارد کنید</h1>
            <div className={style.container}>
                {decisions.map((decision, index) => (
                    <div key={index} className={style.item}>
                        <p>{index + 1}</p>
                        <p>{decision}</p>
                        
                    </div>
                ))}
                {isAddingNew ? (
                    <div className={style.addItemInput}> {/* You'd style this */}
                    <button onClick={() => setIsAddingNew(false)}>╳</button> 
                        <input
                            type="text"
                            value={newItemText}
                            onChange={(e) => setNewItemText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="تصمیم جدید را وارد کنید" 
                            autoFocus
                        />
                        <button onClick={handleAddItem}>افزودن</button>
                        
                    </div>
                ) : (
                    <div className={style.additem} onClick={() => setIsAddingNew(true)}>
                        <img alt="" />
                        <p>+</p>
                        <p>برای افزودن تصمیم جدید کلیک کنید</p>
                    </div>
                )}
            </div>
          <div className={style.nextButtoncont}> 
              <button className={style.nextButton} onClick={handlecheq}>
                صدور چک  <img src={Arrow} alt='' style={{ height: "20px" }} />
            </button>
                <button className={style.nextButton} onClick={goToNextStep}>
                مرحله بعدی <img src={Arrow} alt='' style={{ height: "20px" }} />
            </button>
          </div>
        </div>
    );
}
    }