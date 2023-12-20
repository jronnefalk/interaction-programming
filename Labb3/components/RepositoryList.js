import React, { useState } from "react"; // Import useState here
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_TRENDING_REPOSITORIES } from "../queries/Repositoryqueries";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome";

const RepositoryList = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { loading, error, data } = useQuery(GET_TRENDING_REPOSITORIES, {
    variables: {
      queryString: selectedLanguage
        ? `language:${selectedLanguage} stars:>10000`
        : "stars:>10000",
    },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.error("Error fetching data: ", error);
    return <Text>Error fetching data</Text>;
  }

  if (data && data.search.edges.length > 0) {
    console.log("First Repository Data:", data.search.edges[0].node);
  }
  const renderItem = ({ item }) => {
    const node = item.node; // Access the node property of each item
    return (
      <Pressable
        style={styles.repositoryContainer}
        onPress={() =>
          navigation.navigate("RepositoryDetail", { repository: node })
        }
      >
        <View style={styles.headerContainer}>
          <Text style={styles.repositoryTitle}>{node.name}</Text>
          <View style={styles.iconContainer}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.iconText}>
              {node.stargazers?.totalCount || 0}
            </Text>
          </View>
        </View>
        <Text style={styles.repositoryDescription}>{node.description}</Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.listContainer}>
      <Image
        source={require("../assets/titleimg.png")}
        style={styles.titleImage}
        resizeMode="contain"
      />
      <RNPickerSelect
        value={selectedLanguage}
        onValueChange={(value) => setSelectedLanguage(value)}
        items={[
          { label: "Top Overall", value: "" },
          { label: "JavaScript", value: "JavaScript" },
          { label: "TypeScript", value: "TypeScript" },
          { label: "Java", value: "Java" },
          { label: "Python", value: "Python" },
          { label: "C", value: "C" },
          { label: "C++", value: "C++" },
          { label: "CSS", value: "CSS" },
          { label: "C#", value: "C#" },
          { label: "Swift", value: "Swift" },
          { label: "Rust", value: "Rust" },
          { label: "Go", value: "Go" },
          { label: "Ruby", value: "Ruby" },
          { label: "PHP", value: "PHP" },
          { label: "Web", value: "Web" },
        ]}
        style={{
          inputIOS: styles.dropdownInput,
          inputAndroid: styles.dropdownInput,
          iconContainer: styles.iconContainer,
          placeholder: { color: "737C8C" }, // Customize placeholder color
        }}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <Icon name="arrow-down" size={20} color="white" />;
        }}
      />
      <FlatList
        data={data?.search.edges}
        renderItem={renderItem}
        keyExtractor={(item) => item.node.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#737C8C",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  repositoryContainer: {
    backgroundColor: "#8F96A3",
    borderRadius: 15,
    padding: 15,
    margin: 8,
    flex: 1 / 2, // Each item takes half the width of the screen
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, // Missing comma added here
  },
  repositoryInfo: {
    fontSize: 14,
    color: "#333",
  },
  pickerContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    margin: 10,
    backgroundColor: "#ffffff",
  },
  pickerText: {
    color: "#333333",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  iconText: {
    marginLeft: 5,
    fontSize: 16,
  },
  titleImage: {
    width: "70%", // Adjust as needed
    height: 70, // Adjust as needed
    marginTop: 20, // Adjust as needed
    marginBottom: 20,
    alignSelf: "center",
  },
  dropdownInput: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "gray", // Border color
    borderRadius: 4,
    color: "white", // Text color
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#737C8C", // Background color
  },
  repositoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default RepositoryList;
