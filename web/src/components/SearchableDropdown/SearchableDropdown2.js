import { useState, useRef  } from "react";
import "./SearchableDropdown.css";

const SearchableDropdown2 = ({
    options,
    label,
    id,
    placeholder,
    handleChange
  }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedVal, setSelectedVal] = useState('');
    const dropdownRef = useRef(null);

    const toggle = (val) => {
        setIsOpen(val);
    }

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        setSelectedVal(e.target.value);
    };

    const handleBlur = (e) => {
        // Check if related target (the new focused element) is within the dropdown
        if (!dropdownRef.current.contains(e.relatedTarget)) {
          toggle(false);
        }
    };

    const selectOption = (option) => {
        setQuery(() => "");
        setSelectedVal(option[label]);
        handleChange(option[label]);
        setIsOpen(!isOpen);
      };

    const filter = (options) => {
        return options.filter((option) => option[label].toLowerCase().startsWith(query.toLowerCase()));
    };

    const keyPress = (e) => {
        debugger;
    };
    
    return (
        <div
            className="dropdown"
            ref={dropdownRef}
            tabIndex="0" 
            onFocus={() => toggle(true)}
            onBlur={handleBlur}
        >
            <div className="selected-value">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={selectedVal}
                    onChange={handleInputChange}
                    onClick={() => toggle(true)}
                    />

                <div className={`arrow ${isOpen ? "open" : ""}`}></div>
            </div>
            
            {isOpen && 
                <div className={`options ${isOpen ? "open" : ""}`}>
                    {filter(options).map((option, index) => {
                        return (
                            <div    
                                key={`${index}`}
                                className="option"
                                onClick={() => selectOption(option)}
                                onKeyDown={(e) => keyPress(e)}
                                onKeyUp={(e) => keyPress(e)}>
                                    
                                {option[label]} {index}
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
}

export default SearchableDropdown2;