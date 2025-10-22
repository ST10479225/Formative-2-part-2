// App.tsx
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import Menu from './menu';

type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
};

type RootStackParamList = {
  Home: undefined;
  Menu: { menuItems: MenuItem[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const addDish = () => {
    if (!dishName.trim()) return;
    const newItem: MenuItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course: course.trim() || 'Main',
      price: price.trim() || '0.00',
    };
    setMenuItems((s) => [newItem, ...s]);
    setDishName(''); setDescription(''); setCourse(''); setPrice('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add Dish</Text>

      <TextInput style={styles.input} placeholder="Dish name" value={dishName} onChangeText={setDishName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Course (e.g. Starter/Main/Dessert)" value={course} onChangeText={setCourse} />
      <TextInput style={styles.input} placeholder="Price (e.g. 49.99)" value={price} onChangeText={setPrice} keyboardType="numeric" />

      <Pressable style={styles.addButton} onPress={addDish}>
        <Text style={styles.addText}>Add Dish</Text>
      </Pressable>

      <Pressable
        style={styles.viewButton}
        onPress={() => navigation.navigate('Menu', { menuItems })}
      >
        <Text style={styles.viewText}>View Menu ({menuItems.length})</Text>
      </Pressable>

      <FlatList
        data={menuItems}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listTitle}>{item.dishName} — R{item.price}</Text>
            <Text style={styles.listSub}>{item.course} · {item.description}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No dishes added yet.</Text>}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Add Dishes' }} />
        <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menu' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 8 },
  addButton: { backgroundColor: '#074734', padding: 12, borderRadius: 8, marginBottom: 8 },
  addText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  viewButton: { backgroundColor: '#1166d6ff', padding: 12, borderRadius: 8, marginBottom: 12 },
  viewText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  listItem: { paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' },
  listTitle: { fontWeight: '700' },
  listSub: { color: '#555' },
  empty: { textAlign: 'center', color: '#777', marginTop: 20 },
});
