import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_DETAILS } from "./queries";

const RepositoryDetails = ({ route, navigation }) => {
  const { name, owner } = route.params;

  const { loading, error, data } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { name, owner },
  });

  if (loading)
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.centered}>
        <Text>Error: {error.message}</Text>
      </View>
    );

  // Access the repository data once it's loaded
  const repo = data.repository;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.name}>{repo.name}</Text>
      <Text style={styles.description}>{repo.description}</Text>
      <Text style={styles.info}>
        License: {repo.licenseInfo?.name ?? "N/A"}
      </Text>
      <Text style={styles.info}>
        Commits: {repo.defaultBranchRef?.target?.history?.totalCount ?? "N/A"}
      </Text>
      <Text style={styles.info}>
        Branches: {repo.refs?.totalCount ?? "N/A"}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()} // Navigates back to the previous screen
        >
          <Text style={styles.buttonText}>Tillbaka</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: "lightblue", // Use your app's theme color here
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
});

export default RepositoryDetails;
