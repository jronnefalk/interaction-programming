import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_TRENDING_REPOSITORIES } from "../queries/Repositoryqueries";
import RNPickerSelect from "react-native-picker-select";
import RepositoryItem from "./RepositoryItem";

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

  const renderItem = ({ item }) => (
    <RepositoryItem repository={item.node} navigation={navigation} />
  );

  return (
    <View style={styles.listContainer}>
      <Image
        source={require("../assets/titleimg.png")}
        style={styles.titleImage}
        resizeMode="contain"
      />
      <View style={styles.dropdownContainer}>
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
            placeholder: { color: "737C8C" },
          }}
          useNativeAndroidPickerStyle={false}
        />
      </View>
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
    width: "70%",
    height: 70,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  dropdownContainer: {
    width: 150, // Set the width of the dropdown container
    alignSelf: "flex-end", // Align the container to the right
    marginRight: 10, // Add some right margin if needed
  },
  dropdownInput: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "white",
    paddingRight: 30,
    backgroundColor: "#737C8C",
  },
});

export default RepositoryList;
