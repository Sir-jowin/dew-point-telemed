import React from 'react'
import { useField } from "formik";
// import { CircularLoading } from "../Loading/CircularLoading";
// import CustomSelect from "../PersonalInformation/CustomSelect";
import styled from 'styled-components'
import CustomSelect from './CustomSelect';

const ErrorContainer = styled.div`
  text-align: start;
  color: red;
`

export const TextInput = ({ ...props }) => {
    const [field, meta] = useField(props);
 
    props.className = meta.touched && meta.error ? 
    props.className + " errorline": 
    props.className;
 
    return (
      <>
         <input {...field} {...props} />
         <ErrorContainer>
           {meta.touched && meta.error ? meta.error : null}
         </ErrorContainer>
      </>
    );
};


export const SelectInput = ({ setCurrent, ...props }) => {
    const [field, meta, helpers] = useField(props);

    props.className = meta.touched && meta.error ? 
    props.className + " errorline": 
    props.className;
 
    return (
      <>
        {/* <label htmlFor={props.id || props.name} className={labelClass}>{label}</label> */}
        <CustomSelect 
          {...field}
          {...props}
          value={props.options ? props.options.find(option => option.value === field.value): ""}
          onChange={option => {
            helpers.setValue(option.value)
            if(setCurrent) 
             setCurrent(option.value)
          }}
        />
         <div className="formik-error">
           {meta.touched && meta.error ? meta.error : null}
         </div>
      </>
    );
}

// export const SubmitInput = ({ loadingText, isLoading, ...props }) => {
//   return (
//     <div>
//       <button {...props}>
//           {isLoading ? <CircularLoading />: null} 
//           {!isLoading ? loadingText : `    Please wait...`}
//       </button>
//     </div>
//   )
// }