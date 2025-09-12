import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizScreenProps = {
  currentQuestion: Question;
  selectedOption: string | null;
  isOptionsDisabled: boolean;
  onOptionPress: (option: string) => void;
  onNextQuestion: () => void;
};

export default function QuizScreen({
  currentQuestion,
  selectedOption,
  isOptionsDisabled,
  onOptionPress,
  onNextQuestion,
}: QuizScreenProps) {

  const getOptionStyle = (option: string) => {
    if (selectedOption) {
      const isCorrect = option === currentQuestion.correctAnswer;
      if (isCorrect) {
        return styles.correctOption;
      }
      if (option === selectedOption && !isCorrect) {
        return styles.incorrectOption;
      }
    }
    return {};
  };

  return (
    <View style={styles.container}>
       {/* A View do placar foi removida daqui, pois a lógica de placar agora está no componente pai */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, getOptionStyle(option)]}
            onPress={() => onOptionPress(option)}
            disabled={isOptionsDisabled}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedOption && (
        <TouchableOpacity style={styles.nextButton} onPress={onNextQuestion}>
          <Text style={styles.nextButtonText}>Próxima Pergunta</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f8ff', padding: 16 },
  questionContainer: { flex: 1, backgroundColor: '#ffffff', borderRadius: 12, padding: 16, justifyContent: 'center', marginBottom: 20 },
  questionText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  optionsContainer: { flex: 1, justifyContent: 'space-around' },
  option: { backgroundColor: '#ffffff', padding: 16, borderRadius: 12, borderWidth: 2, borderColor: '#e0e0e0' },
  optionText: { fontSize: 18 },
  correctOption: { borderColor: '#4CAF50', backgroundColor: '#D4EDDA', borderWidth: 2 },
  incorrectOption: { borderColor: '#F44336', backgroundColor: '#F8D7DA', borderWidth: 2 },
  nextButton: { backgroundColor: '#007BFF', padding: 15, borderRadius: 12, marginTop: 20, alignItems: 'center' },
  nextButtonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
});