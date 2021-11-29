import React from 'react'
import Select from 'react-select'


const CustomSelect = ({ options, className, placeholder, ...props }) => {

    return(
        <div className="className" style={{textAlign: 'left'}}>
            <Select
                // className="form-control"
                {...props}
                options={options}
                isSearchable="true"
                placeholder={placeholder}
            />
        </div>
    )
}


export default CustomSelect