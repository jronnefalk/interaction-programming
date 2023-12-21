import React from "react";
import { Text, ScrollView, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const RepositoryDetail = ({ route, navigation }) => {
  const { repository } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#000" />
      </Pressable>

      <Text style={styles.repositoryName}>{repository.name}</Text>
      {repository.licenseInfo && (
        <Text style={styles.detailText}>
          License: {repository.licenseInfo.name}
        </Text>
      )}
      <Text style={styles.detailText}>
        Watchers: {repository.watchers.totalCount}
      </Text>
      <Text style={styles.detailText}>
        Open Issues: {repository.issues.totalCount}
      </Text>
      <Text style={styles.detailText}>
        Open Pull Requests: {repository.pullRequests.totalCount}
      </Text>
      <Text style={styles.detailText}>
        Branches: {repository.refs.totalCount}
      </Text>
      <Text style={styles.detailText}>
        Commits: {repository.defaultBranchRef.target.history.totalCount}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 20,
    padding: 10,
  },
  repositoryName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default RepositoryDetail;
