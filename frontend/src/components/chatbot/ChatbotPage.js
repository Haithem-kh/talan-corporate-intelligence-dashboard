import React, { useState, useRef, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { FaRobot, FaPaperPlane, FaUser } from 'react-icons/fa';
import UniversalNavbar from '../navbar/UniversalNavbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AudioModal from '../voice-modal/AudioModal';
import '../../styles/chatbot.scss';
import axios from 'axios';
import { API_CONFIG, API_ENDPOINTS } from '../../config/api';

const ChatbotPage = () => {
  const [recording, setRecording] = useState(false);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      const res = await axios.post(`${API_CONFIG.CHATBOT_URL}${API_ENDPOINTS.QUERY}`, {
        question: inputMessage
      });

      const botMessage = {
        id: messages.length + 2,
        text: res.data.answer,
        sender: 'bot'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "An error occurred while retrieving the response.",
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleMicClick = async () => {
    if (recording) {
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      setRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 128000,
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = event => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });

        if (!audioBlob || audioBlob.size === 0) return;

        const audioFile = new File([audioBlob], 'recording.webm', {
          type: audioBlob.type,
          lastModified: Date.now()
        });

        const formData = new FormData();
        formData.append('file', audioFile);

        try {
          const response = await axios.post(
            `${API_CONFIG.TRANSCRIPTION_URL}${API_ENDPOINTS.TRANSCRIBE}`,
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
              maxContentLength: Infinity,
              maxBodyLength: Infinity
            }
          );

          const transcript = response.data.transcript;

          const userMessage = {
            id: messages.length + 1,
            text: transcript,
            sender: 'user'
          };

          setMessages(prev => [...prev, userMessage]);

          const botRes = await axios.post(`${API_CONFIG.CHATBOT_URL}${API_ENDPOINTS.QUERY}`, {
            question: transcript
          });

          const botMessage = {
            id: messages.length + 2,
            text: botRes.data.answer,
            sender: 'bot'
          };

          setMessages(prev => [...prev, botMessage]);

        } catch (error) {
          console.error('Upload or bot query failed:', error);
          const errorMessage = {
            id: messages.length + 2,
            text: "An error occurred while processing the audio.",
            sender: 'bot'
          };
          setMessages(prev => [...prev, errorMessage]);
        }

        audioChunksRef.current = [];
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Mic access error:', error);
      alert('Microphone access is required to record audio.');
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="chatbot-page">
      <UniversalNavbar />

      <Container fluid className="chatbot-container">
        <div className="chatbot-main">
          <AudioModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onAudioComplete={() => {}}
            title="Record Your Voice"
            messages={messages}
            setMessages={setMessages}
          />
          <div className="chat-messages">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-avatar">
                  {message.sender === 'bot' ? <FaRobot /> : <FaUser />}
                </div>
                <div className="message-content">
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <Form onSubmit={handleSendMessage} className="chat-input-form">
              <Form.Group className="d-flex position-relative">
                <Button variant="primary" className='voice-button' onClick={() => setShowModal(true)}>
                  <i className="bi bi-soundwave"></i>
                </Button>

                <button
                  type="button"
                  className={`mic-icon ${recording ? 'recording' : ''}`}
                  onClick={handleMicClick}
                  title={recording ? 'Recording... Click to stop' : 'Click to record'}
                >
                  <i className="bi bi-mic-fill"></i>
                </button>

                <Form.Control
                  type="text"
                  placeholder="Type your message here..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="chat-input ps-5"
                />

                <Button type="submit" variant="primary" className="send-button">
                  <FaPaperPlane />
                </Button>
              </Form.Group>

              <div className="input-footer">
                The assistant may produce inaccurate information. Always consult official sources.
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ChatbotPage;
