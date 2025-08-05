import { useState } from 'react';

function GradeInput() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;

    // فقط اجازه عدد با حداکثر ۲ رقم اعشار
    if (/^\d{0,2}(\.\d{0,2})?$/.test(val)) {
      const num = parseFloat(val);

      // بررسی نهایی: عدد <= 20
      if (val === '' || (!isNaN(num) && num <= 20)) {
        setValue(val);
      }
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="نمره ای وارد نکرده اید"
    />
  );
}

export default GradeInput;
