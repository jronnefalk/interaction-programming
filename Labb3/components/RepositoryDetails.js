import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_DETAILS } from "./queries";

const RepositoryDetails = ({ route, navigation }) => {
  const { name, owner } = route.params;

  const { loading, error, data } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: { name, owner },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  // Access the repository data once it's loaded
  const repo = data.repository;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{repo.name}</Text>
      <Text style={styles.description}>{repo.description}</Text>
      <Text style={styles.info}>
        License: {repo.licenseInfo?.name ?? "N/A"}
      </Text>
      {/* Accessing the commit count from the history object on the default branch */}
      <Text style={styles.info}>
        Commits: {repo.defaultBranchRef?.target?.history?.totalCount ?? "N/A"}
      </Text>
      {/* Accessing the branch count from the refs object */}
      <Text style={styles.info}>
        Branches: {repo.refs?.totalCount ?? "N/A"}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()} // Navigates back to the previous screen
      >
        <Text style={styles.buttonText}>Tillbaka</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
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
