export const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      // border: state.isFocused ? '0px solid rgba(255, 255, 255, 0.55)' : '0px solid rgba(255, 255, 255, 0.55)',
      borderRadius: '10px',
      border: '0px',
      boxShadow: 'none',
      padding: '5px 0px 5px 12px',
      color:'#6A6A6A',
      border: state.isFocused?  '1px solid #E5E5E5' : '1px solid #E5E5E5',
      backgroundColor:'#ffffff',
      cursor: 'pointer',
   
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#E3E3E8' : '#ffffff',
      color: '#6A6A6A', // Set the color of the option text to white
      padding: '8px 29px 8px 19px',
      fontSize: '14px',
      cursor: 'pointer',
      borderBottom: '1px solid #E5E5E5',
      borderTop: 'none',
      marginBottom: '0',
      marginTop: '0',
      transition: '0.2s ease-in',
      '&:hover': {
        backgroundColor: '#E3E3E8',
        color: '#6A6A6A'
      }
    }),
    menu: (provided, state) => ({
      ...provided,
      background: '#ffffff',
      boxShadow: 'none',
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: '0',
      marginTop: '-7px',
      marginBottom: '0',
      borderRadius: '5px',
      backgroundColor: '#ffffff',
      border: '1px solid #E5E5E5', // Add borderTop to the menuList
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transition: 'transform 0.3s', // Add transition for smooth rotation effect
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null, // Rotate the arrow when menu is open
      color: '#6A6A6A'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white' // Set the color of the selected text to white
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#808B9A' // Set the color of the placeholder text to white
    })
};

