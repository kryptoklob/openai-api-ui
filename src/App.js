import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  Container,
  Form,
  Label,
  Input,
  InputContainer,
  Button,
  ModelList,
  ModelCard,
  ModelTitle,
  ModelStatus,
  EventDate,
  EventList,
  EventDescription,
  EventItem,
  Select
} from './components';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [dataFile, setDataFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get('https://api.openai.com/v1/fine-tunes', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });
    let modelList = response.data.data;
    console.log(`${modelList.length} models retrieved`);
    modelList.sort((a, b) => b.created_at - a.created_at);

    let models = [];
    for (const model of modelList) {
      const id = model.id;
      const detailed = await axios.get(
        `https://api.openai.com/v1/fine-tunes/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      models.push(detailed.data);
    }

    setModels(models);
  };

  const handleDeleteModel = async (finetunedid) => {
    try {
      await axios.delete(`https://api.openai.com/v1/models/${finetunedid}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        }
      });
      setModels((prevModels) =>
        prevModels.filter((model) => model.fine_tuned_model !== finetunedid)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setDataFile(file);
  };

  const handleCreateModel = async () => {
    const formData = new FormData();
    formData.append('file', dataFile);
    formData.append('purpose', 'fine-tune');
    try {
      const fileUploadResponse = await axios.post('https://api.openai.com/v1/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const fileId = fileUploadResponse.data.id

      const createData = {
        training_file: fileId,
        model: selectedModel
      }

      const response = await axios.post('https://api.openai.com/v1/fine-tunes', createData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const newModel = response.data;
      setModels((prevModels) => [newModel, ...prevModels]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
        <Form onSubmit={handleSubmit}>
        <InputContainer>
        <h4>Settings</h4>
          <Input
            type="text"
            placeholder="Enter your OpenAI API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Button type="submit">Get Models</Button>
          </InputContainer>
          <InputContainer>
          <h4>Create New Fine-Tune</h4>
          <Select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="">Select a base model</option>
            <option value="davinci">Davinci</option>
            <option value="curie">Curie</option>
            <option value="babbage">Babbage</option>
            <option value="ada">Ada</option>
          </Select>
          <Input
            type="file"
            accept=".jsonl"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <Button type="button" onClick={handleCreateModel} disabled={!selectedModel || !dataFile}>
            Create Model
          </Button>
          </InputContainer>
          
        </Form>
      <ModelList>
        {models.map((model) => (
          <ModelCard key={model.id}>
            <ModelTitle>ID: {model.id}</ModelTitle>
            <ModelStatus>
              Created:{' '}
              {new Date(model.created_at * 1000).toLocaleString()}
            </ModelStatus>
            <ModelStatus>
              Base Model: {model.model.charAt(0).toUpperCase() + model.model.slice(1)}
            </ModelStatus>
            <ModelStatus>
              Status: {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
            </ModelStatus>
            {model.events && model.events.length > 0 && (
              <EventList>
                {model.events.map((event, index) => (
                  <EventItem key={index}>
                    <EventDate>{(new Date(event.created_at * 1000).toLocaleTimeString())}</EventDate>
                    <EventDescription>{event.level} - {event.message}</EventDescription>
                  </EventItem>
                ))}
              </EventList>
            )}
            {model.fine_tuned_model !== null && (
              <Button onClick={() => handleDeleteModel(model.fine_tuned_model)}>
                Delete
              </Button>
            )}
          </ModelCard>
        ))}
      </ModelList>
    </Container>
  );
}

export default App;