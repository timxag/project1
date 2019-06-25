import React from 'react';
export const FormErrors = ({ formErrors }) =>
    <div className='formErrors'>
        {Object.keys(formErrors).map((link) => {
            if (formErrors[link].length > 0) {
                return (
                    <p>{link} {formErrors[link]}</p>
                )
            } else {
                return <p style={{ opacity: 0 }}>{link} {formErrors[link]}</p>;
            }
        })}
    </div>
