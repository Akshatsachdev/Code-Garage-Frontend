import { useEffect, useState } from 'react';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
}

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser.');
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
    };

    setRecognition(recognitionInstance);
  }, []);

  const startListening = () => {
    if (recognition) {
      setTranscript('');
      recognition.start();
    }
  };

  return { transcript, startListening };
};

export default useSpeechRecognition;
