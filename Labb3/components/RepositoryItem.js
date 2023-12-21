import React from "react";
import { Text, View, StyleSheet, Pressable, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const RepositoryItem = ({ repository, navigation }) => {
  const renderLanguages = (languages) => {
    return (
      <FlatList
        data={languages.edges}
        horizontal
        renderItem={({ item }) => (
          <Text style={styles.languageText}>{item.node.name}</Text>
        )}
        keyExtractor={(item, index) => `lang-${index}`}
        style={styles.languagesList}
      />
    );
  };

  return (
    <Pressable
      style={styles.repositoryContainer}
      onPress={() =>
        navigation.navigate("RepositoryDetail", { repository: repository })
      }
    >
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.repositoryTitle}>{repository.name}</Text>
        </View>
        <View style={styles.starContainer}>
          <Icon name="star" size={20} color="#FFD700" />
          <Text style={styles.iconText}>
            {repository.stargazers?.totalCount || 0}
          </Text>
        </View>
      </View>
      <Text style={styles.repositoryDescription}>{repository.description}</Text>
      {repository.languages &&
        repository.languages.edges.length > 0 &&
        renderLanguages(repository.languages)}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  repositoryContainer: {
    backgroundColor: "#8F96A3",
    borderRadius: 15,
    padding: 15,
    margin: 10,
    flex: 1 / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1, // Takes up the available space
  },
  repositoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  starContainer: {
    flexDirection: "row", // Horizontally align the star icon and total count
    alignItems: "center", // Vertically center align the star icon and total count
  },
  iconText: {
    marginLeft: 5,
    fontSize: 16,
  },
  languageText: {
    marginRight: 10,
    color: "#c7cad1",
  },
  languagesList: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  repositoryDescription: {
    fontSize: 14,
    color: "black",
    marginTop: 5,
  },
});

export default RepositoryItem;
