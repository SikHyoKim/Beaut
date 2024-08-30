import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const App = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [memo, setMemo] = useState('');
  const [memos, setMemos] = useState({});

  LocaleConfig.locales.fr = {
    monthNames: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    monthNamesShort: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    dayNames: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
    dayNamesShort: ['일','월','화','수','목','금','토'],
    today: "Aujourd'jui",
  };
  LocaleConfig.defaultLocale = 'fr';

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
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
  // 달력 헤더를 커스터마이즈하는 함수
  const renderHeader = () => {
    const date = new Date(selectedDate);
    return (
      <Text style={styles.headerText}>
        {formatDate(selectedDate)}
      </Text>
    );
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calenDarsWrapper}>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{
            [selectedDate]: { selected: true, marked: true },
          }}
          theme={{
            // calendarBackground: '#000000',
          }}
          renderHeader={renderHeader}
        />
        <Text style={styles.dateText}>
          {selectedDate ? formatDate(selectedDate) : '날짜 선택하기'}
        </Text>
        <TextInput
          style={styles.input}
          value={memo}
          onChangeText={setMemo}
          placeholder="메모 추가하기"
        />
        <Button title="메모 추가" onPress={addMemo} />
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

  // 날짜를 "YYYY년 MM월" 형식으로 포맷팅하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    return `${year}년 ${month}월`;
  };


export default App;
