import style from './MeetingPart3.module.css';
import Arrow from '../../assets/icons/arrow.svg';
import { useFormData } from '../MeetingFrame/MeetingFrame';
import React from 'react'; // Removed useState as it's not used here anymore

// 1. Import the TextEditor component and its CSS
import TextEditor from '../TextEditor/TextEditor';
import '../TextEditor/TextEditor.css';

export default function MeetingPart3() {
    const { formData, updateFormData, goToNextStep } = useFormData();

    // This logic for radio buttons is kept from your original code
    const handleSelect = (option) => {
        updateFormData({ documentType: option.id });
    };

    // 2. Create a handler to update formData with the editor's content
    const handleMinutesChange = (content) => {
        updateFormData({ meetingMinutes: content }); // Save content to 'meetingMinutes' field
    };

    return (
        <div className={style.DocumentPart2}>
            <h1>مشروح مذاکرات را وارد کنید</h1>
            
          
          <div className={style.container}>
             <div className={style.cont}>
                 <TextEditor
                initialContent={formData.meetingMinutes || ''}
                onContentChange={handleMinutesChange}
            />
             </div>
          </div>
            
            <button className={style.nextButton} onClick={goToNextStep}>
                مرحله بعدی <img src={Arrow} alt='' style={{ height: "20px" }} />
            </button>
        </div>
    );
}