import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';


const Calendars = () => {
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [memo, setMemo] = useState('');
  const [memos, setMemos] = useState({});
  // const [markedDates, setMarkedDates] = useState({});

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

  // useEffect(() => {
  //   setMarkedDates(getMarkedDates());
  // }, [selectedDate]);

  // 달력 헤더를 커스터마이즈하는 함수
  const renderHeader = () => {
    return (
      <Text>
        {formatDate(selectedDate)}
      </Text>
    );
  };

  // const getMarkedDates = () => {
  //   const markedDates = {};
  //   const today = new Date();
  //   const currentYear = today.getFullYear();
  //   const currentMonth = today.getMonth();
    
  //   for (let day = 1; day <= 31; day++) {
  //     const date = new Date(currentYear, currentMonth, day);
  //     if (date.getMonth() !== currentMonth) continue;

  //     const dateString = date.toISOString().split('T')[0];
  //     const dayOfWeek = date.getDay();

  //     markedDates[dateString] = { marked: true };

  //     if (dayOfWeek === 1) {
  //       markedDates[dateString].dotColor = 'red';
  //     } else if (dayOfWeek === 0) {
  //       markedDates[dateString].dotColor = 'blue';
  //     }
  //   }
  //   return markedDates;
  // };

  return (

      <View style={styles.calenDarsWrapper}>
        <Calendar
          onDayPress={day => {setSelectedDate(day.dateString)}}
          // markedDates={markedDates}
          theme={{
            // calendarBackground: '#000000',
          }}
          
          renderHeader={renderHeader}
        />
        <FlatList
          data={memos[selectedDate] || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.memoText}>{item}</Text>}
        />
      </View>

  );
};

const styles = StyleSheet.create({
  calenDarsWrapper: {
    flex: 1,
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 5,
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
  // 현재 날짜를 "YYYY-MM-DD" 형식으로 반환하는 함수
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
  const day = String(now.getDate()).padStart(2, '0'); // 일
  return `${year}-${month}-${day}`;
};

export default Calendars;