import styled from 'styled-components';

const Container = styled.div`
  max-width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-right: 10px;
  align-self: center;
`;

const Input = styled.input`
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #f8f9fa;
  color: #343a40;
  padding: 10px;
  margin-right: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #0062cc;
  }
`;

const ModelList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ModelCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  width: calc(50% - 20px);
  max-width: 500px;
  text-wrap: wrap;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
`;

const EventList = styled.ul`
  background-color: #e9f9fa;
  margin-top: 10px;
  max-height: 200px;
  overflow-y: auto;
  font-family: monospace;
  padding: 5px;
`;

const ModelTitle = styled.h3`
  font-family: monospace;
  font-size: 18px;
  margin-bottom: 5px;
`;

const ModelStatus = styled.p`
  font-family: monospace;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const SuccessEmoji = styled.span`
  margin-right: 5px;
  font-size: 20px;
`;

const FailureEmoji = styled.span`
  margin-right: 5px;
  font-size: 20px;
`;

const EventDate = styled.p`
  font-size: 8px;
  margin: 0;
  font-family: monospace;
`;

const EventDescription = styled.p`
  font-size: 10px;
  margin: 0px;
  padding: 1px;
  font-family: monospace;
`;

const EventItem = styled.span`
`;

export {
  Container,
  Form,
  Label,
  Input,
  Button,
  ModelList,
  ModelCard,
  ModelTitle,
  ModelStatus,
  SuccessEmoji,
  FailureEmoji,
  EventDate,
  EventList,
  EventDescription,
  EventItem
}