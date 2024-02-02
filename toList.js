import { useState } from "react";
import { Keyboard, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";

const App = () => {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(0);

  const addItem = () => {
    setList([...list, {
        key: Math.random().toString(),
        data: item
      }
    ]);
    setItem("");
    Keyboard.dismiss();
    ToastAndroid.show("Item added successfully!", ToastAndroid.SHORT);
  }

  const deleteItem = (key) => {
    setList(list.filter(element => element.key != key));
  }

  const updateItem = (element) => {
    setEdit(element.key);
    setItem(element.data);
  }

  const updateData = () => {
    setList(list.map(element => element.key == edit? {key: edit, data: item}: element));
    setEdit(0);
    setItem("");
    Keyboard.dismiss();
    ToastAndroid.show("Item updated successfully!", ToastAndroid.SHORT);
  }
  return (
    <View>
      <StatusBar backgroundColor="lightblue"></StatusBar>
      <View style={mystyles.header}>
        <Text style={mystyles.headerText}>To Do List</Text>
      </View>
      <View style={mystyles.addView}>
        <TextInput
         style={mystyles.addInput}
         value={item}
         onChangeText={setItem}
         placeholder="Enter an Item"
         ></TextInput>
        <TouchableOpacity
         style={mystyles.addButton}
         onPress={edit == 0? addItem: updateData}>
          <Text style={mystyles.addText}>{edit == 0? "Add Item": "Update"}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={mystyles.listView}>
        {list.map((element, index) => (
          <TouchableOpacity
           style={mystyles.listItem}
           onPress={() => {updateItem(element)}}
           >
            <Text style={mystyles.listText}>{index + 1}- {element.data}</Text>
            <TouchableOpacity
             style={mystyles.listButton}
             onPress={() => deleteItem(element.key)}
             >
              <Text style={mystyles.listCross}>X</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const mystyles = StyleSheet.create({
  header: {
    backgroundColor: "lightblue",
    padding: 10
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  },
  addView: {
    width: "90%",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 15
  },
  addInput: {
    borderWidth: 1,
    width: "70%"
  },
  addButton: {
    backgroundColor: "lightblue",
    justifyContent: "center",
    padding: 10,
    borderRadius: 40,
    marginLeft: 5
  },
  addText: {
    color: "white",
    fontSize: 16
  },
  listView: {
    width: "90%",
    alignSelf: "center",
    marginTop: 15
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 40,
    padding: 10,
    marginBottom: 10,
    alignItems: "center"
  },  
  listText: {
    fontSize: 16,
    marginLeft: 10
  },
  listButton: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 40,
    backgroundColor: "lightblue",
  },
  listCross: {
    color: "white"
  }
});

export default App;