import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const App = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [memo, setMemo] = useState('');
  const [memos, setMemos] = useState({});

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    // 선택한 날짜의 메모를 불러오는 로직이 여기 들어갑니다.
  };

  const addMemo = () => {
    if (memo) {
      const updatedMemos = {
        ...memos,
        [selectedDate]: [...(memos[selectedDate] || []), memo],
      };
      setMemos(updatedMemos);
      setMemo('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calenDarsWrapper}>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, marked: true },
        }}
      />
      <Text style={styles.dateText}>{selectedDate ? `Selected date: ${selectedDate}` : 'Select a date'}</Text>
      <TextInput
        style={styles.input}
        value={memo}
        onChangeText={setMemo}
        placeholder="Add a memo"
      />
      <Button title="Add Memo" onPress={addMemo} />
      <FlatList
        data={memos[selectedDate] || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.memoText}>{item}</Text>}
      />
    </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calenDarsWrapper: {
    flex: 1,
  },
  dateText: {
    marginVertical: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  memoText: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
