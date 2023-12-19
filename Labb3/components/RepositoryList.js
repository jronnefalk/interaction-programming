import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_TRENDING_REPOSITORIES } from "./queries";
import LanguageSelector from "./LanguageSelector";

const RepositoryList = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const { loading, error, data } = useQuery(GET_TRENDING_REPOSITORIES, {
    variables: { queryString: `language:${selectedLanguage} stars:>10000` },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {data?.search.edges.map((edge) => {
          const repo = edge.node;
          return (
            <TouchableOpacity
              key={repo.id}
              style={styles.card}
              onPress={() => {
                navigation.navigate("RepositoryDetails", {
                  name: repo.name,
                  owner: repo.owner.login,
                });
              }}
            >
              <Text style={styles.title}>{repo.name}</Text>
              <Text style={styles.owner}>{repo.owner.login}</Text>
              <Text style={styles.description}>{repo.description}</Text>
              <View style={styles.stats}>
                <Text>Forks: {repo.forks?.totalCount ?? "N/A"}</Text>
                <Text>Stars: {repo.stargazers?.totalCount ?? "N/A"}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginBottom: 60, // Height of the footer
  },
  card: {
    backgroundColor: "#f0e1ec",
    borderRadius: 6,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  owner: {
    fontSize: 14,
    color: "gray",
  },
  description: {
    fontSize: 14,
    marginVertical: 8,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "white",
  },
});

export default RepositoryList;
