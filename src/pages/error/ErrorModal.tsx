import React from 'react';
import { Modal } from '@nextui-org/react';
import ReactMarkdown from 'react-markdown';

type ErrorModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  response: { errorMessageSummary: string; reason: string; possibleSolution: string } | null;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onRequestClose, response }) => {
  const markdownContent = response
    ? `
### Error Message Summary
${response.errorMessageSummary}

### Reason
${response.reason}

### Possible Solution
${response.possibleSolution}
`
    : '';

  return (
    <Modal open={isOpen} onClose={onRequestClose}>
      <Modal.Header>
        <h3>Error Information</h3>
      </Modal.Header>
      <Modal.Body>
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </Modal.Body>
      <Modal.Footer>
        <button className='button' onClick={onRequestClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
