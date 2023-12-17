import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Box } from '@chakra-ui/react';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <Box>
      <Box display={visible ? 'none' : ''}>
        <Button
          onClick={toggleVisibility}
          id='view-test-btn'
          size="md" 
          width="100%"
          marginTop="10px"
        >
          {props.buttonLabel}
        </Button>
      </Box>
      <Box display={visible ? '' : 'none'}>
        {props.children}
        <Button
          onClick={toggleVisibility}
          size="md" 
          width="100%"
          marginTop="10px"
        >{props.hideLabel}</Button>
      </Box>
    </Box>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
